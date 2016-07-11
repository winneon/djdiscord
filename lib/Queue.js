"use strict";
// External Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ytdl = require("youtube-dl");
var Request_1 = require("./Request");

var Queue = function () {
    function Queue(bot) {
        _classCallCheck(this, Queue);

        this.bot = bot;
        this.list = [];
        this.started = false;
        this.isPlaying = false;
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
                        duration: sec
                    });
                    _this.list.push(request);
                    _this._checkQueue();
                    if (callback) callback(undefined, request, _this.list.length);
                }
            });
        }
    }, {
        key: "remRequest",
        value: function remRequest(position, callback) {
            if (this.list.length >= position + 1) {
                var voice = this.bot.client.voiceConnection;
                var cont = false;
                var request = this.list[position];
                if (position === 0 && this.started) {
                    this.bot.client.setPlayingGame(null, function (error) {
                        if (error) {
                            console.error("An error occurred resetting the song status on remove.");
                            console.error(error);
                        }
                    });
                    voice.stopPlaying();
                    this.started = false;
                    this.isPlaying = false;
                    cont = true;
                }
                this.list.splice(position, 1);
                if (cont) {
                    this._checkQueue();
                }
                if (callback) callback(undefined, request);
            } else {
                if (callback) callback("nothing playing", undefined);
            }
        }
    }, {
        key: "_checkQueue",
        value: function _checkQueue() {
            if (!this.isPlaying && !this.bot.client.voiceConnection.playing && this.list.length > 0) {
                this._queryQueue(this.currentlyPlaying);
            }
        }
    }, {
        key: "_queryQueue",
        value: function _queryQueue(request) {
            var _this2 = this;

            console.log(this.list[0]);
            this.isPlaying = true;
            var stream = ytdl(request.link, ["--format=bestaudio[abr<=192]/best"]);
            stream.on("info", function (info, format) {
                _this2.bot.client.setPlayingGame(info.title);
                _this2.bot.sendMessage(_this2.bot.config.linked.text, {
                    message: "Now playing `" + request.title + "`."
                });
            });
            stream.on("error", function (error) {
                _this2.bot.sendMessage(_this2.bot.config.linked.text, {
                    message: "```\n" + error.message + "\n```"
                });
                _this2.remRequest(0);
            });
            this.bot.client.startTyping(this.bot.config.linked.text);
            this.bot.client.voiceConnection.playRawStream(stream, function (error, intent) {
                if (error) {
                    console.error("An error occurred playing a stream.");
                    console.error(error);
                } else {
                    _this2.started = true;
                    intent.on("end", function () {
                        _this2.remRequest(0);
                    });
                }
            });
        }
    }, {
        key: "currentlyPlaying",
        get: function get() {
            return this.list.length > 0 ? this.list[0] : undefined;
        }
    }]);

    return Queue;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Queue;
//# sourceMappingURL=Queue.js.map
