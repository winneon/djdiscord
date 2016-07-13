"use strict";
// External Node Imports

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ytdl = require("youtube-dl");
var Logger_1 = require("./Logger");
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
        value: function addRequest(link, user) {
            var url = false;
            if (require("valid-url").isUri(link)) {
                url = true;
            } else {
                link = "gvsearch1:" + link;
            }
            var that = this;
            return new Promise(function (resolve, reject) {
                ytdl.getInfo(link, function (error, info) {
                    if (error) {
                        if (error.message.indexOf("ERROR: Unsupported URL") > -1) {
                            reject(new Error("Invalid URL!"));
                        } else {
                            reject(error);
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
                        if (that.list.length > 1 && that.list[that.list.length - 1].requester !== request.requester) {
                            var i = that.list.length - 1;
                            while (true) {
                                if (that.list[i - 1] && that.list[i].requester === that.list[i - 1].requester) {
                                    i--;
                                    continue;
                                } else {
                                    that.list.splice(i + 1, 0, request);
                                    break;
                                }
                            }
                        } else {
                            that.list.push(request);
                        }
                        resolve({
                            request: request,
                            position: that.list.indexOf(request) + 1
                        });
                        setTimeout(function () {
                            that._checkQueue();
                        }, 1000);
                    }
                });
            });
        }
    }, {
        key: "remRequest",
        value: function remRequest(position) {
            var _this = this;

            if (this.list.length >= position + 1) {
                var _ret = function () {
                    var voice = _this.bot.client.voiceConnection;
                    var cont = false;
                    var request = _this.list[position];
                    //console.log(this.list);
                    if (position === 0 && _this.isPlaying) {
                        _this.bot.client.setPlayingGame(null).catch(function (error) {
                            return console.error(error);
                        });
                        _this.veto = true;
                        voice.stopPlaying();
                        _this.isPlaying = false;
                        _this.started = false;
                        cont = true;
                        setTimeout(function () {
                            if (_this.veto) {
                                _this.veto = false;
                            }
                        }, 5000);
                    }
                    _this.list.splice(position, 1);
                    setTimeout(function () {
                        if (cont) {
                            _this._checkQueue();
                        }
                    }, 1000);
                    return {
                        v: Promise.resolve(request)
                    };
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            } else {
                return Promise.reject(new Error("There is nothing playing."));
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
            var _this2 = this;

            this.started = true;
            var loadMessage = undefined;
            var stream = ytdl(request.link, ["--format=bestaudio[abr<=192]/best"]);
            stream.on("info", function (info, format) {
                if (loadMessage) {
                    _this2.bot.client.deleteMessage(loadMessage).catch(function (error) {
                        return console.error(error);
                    });
                }
                Logger_1.default.announce(_this2.bot, "Now Playing: `" + request.title + "`.");
                _this2.bot.client.setPlayingGame(info.title).catch(function (error) {
                    return console.error(error);
                });
            });
            stream.on("error", function (error) {
                Logger_1.default.error(_this2.bot, "Unknown Error:\n\n```" + error.message + "```", error);
                _this2.remRequest(0);
            });
            Logger_1.default.announce(this.bot, "Loading: `" + request.title + "`...").then(function (message) {
                return loadMessage = message;
            });
            this.bot.client.voiceConnection.playRawStream(stream).then(function (intent) {
                _this2.isPlaying = true;
                intent.on("error", function (error) {
                    return console.error(error);
                });
                intent.on("end", function () {
                    if (_this2.veto) {
                        _this2.veto = false;
                    } else {
                        _this2.remRequest(0);
                    }
                });
            }).catch(function (error) {
                return console.error(error);
            });
        }
    }, {
        key: "currentlyPlaying",
        get: function get() {
            return this.list.length > 0 ? "Now Playing: `" + (this.list[0].shortTitle ? this.list[0].shortTitle : this.list[0].title) + " [" + Utils_1.default.secondsAsString(parseInt((this.bot.client.voiceConnection.streamTime / 1000).toString())) + "/" + this.list[0].durationAsString + "]`." : "There is nothing playing.";
        }
    }]);

    return Queue;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue;
//# sourceMappingURL=Queue.js.map
