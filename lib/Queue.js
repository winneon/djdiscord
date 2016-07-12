"use strict";
// External Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ytdl = require("youtube-dl");
var Request_1 = require("./Request");
var Utils_1 = require("./Utils");

var Queue = function () {
    function Queue(bot) {
        _classCallCheck(this, Queue);

        this.bot = bot;
        this.list = [];
        this.isPlaying = false;
        this.started = false;
        this.veto = false;
    }

    _createClass(Queue, [{
        key: "addRequest",
        value: function addRequest(link, user, callback) {
            var _this = this;

            var url = false;
            if (require("valid-url").isUri(link)) {
                url = true;
            } else {
                link = "gvsearch1:" + link;
            }
            ytdl.getInfo(link, function (error, info) {
                if (error) {
                    if (error.message.indexOf("ERROR: Unsupported URL") > -1) {
                        if (callback) callback("invalid", undefined, undefined);
                    } else {
                        if (callback) callback(error.message, undefined, undefined);
                    }
                } else {
                    // Credit to http://stackoverflow.com/a/9640417.
                    var split = info.duration.split(":");
                    var sec = 0;
                    var min = 1;
                    while (split.length > 0) {
                        sec += min * parseInt(split.pop(), 10);
                        min *= 60;
                    }
                    var request = new Request_1.default({
                        title: info.fulltitle,
                        link: url ? link : "https://www.youtube.com/watch?v=" + info.id,
                        requester: user.id ? user.id : user,
                        duration: sec,
                        shortTitle: info.title
                    });
                    if (_this.list.length > 1 && _this.list[_this.list.length - 1].requester !== request.requester) {
                        var i = _this.list.length - 1;
                        while (true) {
                            if (_this.list[i - 1] && _this.list[i].requester === _this.list[i - 1].requester) {
                                i--;
                                continue;
                            } else {
                                _this.list.splice(i + 1, 0, request);
                                break;
                            }
                        }
                    } else {
                        _this.list.push(request);
                    }
                    if (callback) callback(undefined, request, _this.list.indexOf(request) + 1);
                    setTimeout(function () {
                        _this._checkQueue();
                    }, 1000);
                }
            });
        }
    }, {
        key: "remRequest",
        value: function remRequest(position, callback) {
            var _this2 = this;

            if (this.list.length >= position + 1) {
                (function () {
                    var voice = _this2.bot.client.voiceConnection;
                    var cont = false;
                    var request = _this2.list[position];
                    //console.log(this.list);
                    if (position === 0 && _this2.isPlaying) {
                        _this2.bot.client.setPlayingGame(null, function (error) {
                            if (error) {
                                console.error("An error occurred resetting the song status on remove.");
                                console.error(error);
                            }
                        });
                        _this2.veto = true;
                        voice.stopPlaying();
                        _this2.isPlaying = false;
                        _this2.started = false;
                        cont = true;
                    }
                    _this2.list.splice(position, 1);
                    if (callback) callback(undefined, request);
                    setTimeout(function () {
                        if (cont) {
                            _this2._checkQueue();
                        }
                    }, 1000);
                })();
            } else {
                if (callback) callback("nothing playing", undefined);
            }
        }
    }, {
        key: "_checkQueue",
        value: function _checkQueue() {
            if (!this.started && !this.bot.client.voiceConnection.playing && this.list.length > 0) {
                this._queryQueue(this.list[0]);
            }
        }
    }, {
        key: "_queryQueue",
        value: function _queryQueue(request) {
            var _this3 = this;

            this.started = true;
            var loadMessage = undefined;
            var stream = ytdl(request.link, ["--format=bestaudio[abr<=192]/best"]);
            stream.on("info", function (info, format) {
                if (loadMessage) {
                    _this3.bot.client.deleteMessage(loadMessage, function (error) {
                        if (error) {
                            console.error("An error occurred deleting the loading message.");
                            console.error(error);
                        }
                    });
                }
                _this3.bot.sendMessage(_this3.bot.config.linked.text, {
                    message: "Now Playing: `" + request.title + "`."
                });
                _this3.bot.client.setPlayingGame(info.title);
            });
            stream.on("error", function (error) {
                _this3.bot.sendMessage(_this3.bot.config.linked.text, {
                    message: "```\n" + error.message + "\n```"
                });
                _this3.remRequest(0);
            });
            this.bot.sendMessage(this.bot.config.linked.text, {
                message: "Loading: `" + request.title + "`..."
            }, function (message) {
                loadMessage = message;
            });
            this.bot.client.voiceConnection.playRawStream(stream, function (error, intent) {
                if (error) {
                    console.error("An error occurred playing a stream.");
                    console.error(error);
                } else {
                    _this3.isPlaying = true;
                    intent.on("end", function () {
                        if (_this3.veto) {
                            _this3.veto = false;
                        } else {
                            _this3.remRequest(0);
                        }
                    });
                }
            });
        }
    }, {
        key: "currentlyPlaying",
        get: function get() {
            return "Now Playing: `" + (this.list[0].shortTitle ? this.list[0].shortTitle : this.list[0].title) + " [" + new Utils_1.default().secondsAsString(parseInt((this.bot.client.voiceConnection.streamTime / 1000).toString())) + "/" + this.list[0].durationAsString + "]`.";
        }
    }]);

    return Queue;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue;
//# sourceMappingURL=Queue.js.map
