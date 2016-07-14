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
        key: "getRequest",
        value: function getRequest(position, user) {
            var id = user.id ? user.id : user;
            if (typeof id === "string" && this.list[position] && this.list[position].requester === id) {
                return this.list[position];
            } else {
                return undefined;
            }
        }
    }, {
        key: "getRequests",
        value: function getRequests(user) {
            var id = user.id ? user.id : user;
            var requests = [];
            if (typeof id === "string") {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var request = _step.value;

                        if (request.requester === id) {
                            requests.push(request);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return requests;
        }
    }, {
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
                            reject(new Error("Invalid URL."));
                        } else {
                            reject(error);
                        }
                    } else if (info instanceof Array) {
                        reject(new Error("Playlists not supported."));
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

            setTimeout(function () {
                _this._checkQueue();
            }, 1000);
            return this._remRequestCallback(position);
        }
    }, {
        key: "remRequests",
        value: function remRequests(either) {
            var _this2 = this;

            if (either instanceof Array) {
                if (either.some(Number.isNaN) || either.some(function (obj) {
                    return obj < 0;
                })) {
                    return Promise.reject(new Error("The provided array must only contain Number objects above -1."));
                } else {
                    var error = -1;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = either[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var position = _step2.value;

                            if (!this.list[position]) {
                                error = position;
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (error > -1) {
                        return Promise.reject(new Error("Position " + error + " is not in the queue."));
                    } else {
                        var _ret = function () {
                            var requests = [];
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = either[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var position = _step3.value;

                                    _this2._remRequestCallback(position).then(function (request) {
                                        return requests.push(request);
                                    });
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }

                            setTimeout(function () {
                                _this2._checkQueue();
                            }, 1000);
                            return {
                                v: Promise.resolve(requests)
                            };
                        }();

                        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                    }
                }
            } else {
                var id = either.id ? either.id : either;
                if (typeof id === "string") {
                    var _ret2 = function () {
                        var requests = _this2.getRequests(id);
                        if (requests.length > 0) {
                            var _ret3 = function () {
                                var that = _this2;
                                var count = 0;
                                return {
                                    v: {
                                        v: new Promise(function (resolve, reject) {
                                            function run(position) {
                                                that._remRequestCallback(position).then(function (request) {
                                                    if (count === requests.length - 1) {
                                                        setTimeout(function () {
                                                            that._checkQueue();
                                                        }, 1000);
                                                        resolve(requests);
                                                    } else {
                                                        run(that.list.indexOf(requests[count++]));
                                                    }
                                                }).catch(function (error) {
                                                    return reject(error);
                                                });
                                            }
                                            run(that.list.indexOf(requests[count]));
                                        })
                                    }
                                };
                            }();

                            if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
                        } else {
                            return {
                                v: Promise.reject(new Error("That user has no requests in the queue."))
                            };
                        }
                    }();

                    if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
                } else {
                    return Promise.reject(new Error("The provided argument can only be Array, String, or User."));
                }
            }
        }
    }, {
        key: "_remRequestCallback",
        value: function _remRequestCallback(position) {
            var _this3 = this;

            if (this.list.length > position) {
                var voice = this.bot.client.voiceConnection;
                var request = this.list[position];
                if (position === 0 && this.isPlaying) {
                    this.bot.client.setPlayingGame(null).catch(function (error) {
                        return console.error(error);
                    });
                    this.veto = true;
                    voice.stopPlaying();
                    this.isPlaying = false;
                    this.started = false;
                    setTimeout(function () {
                        if (_this3.veto) {
                            _this3.veto = false;
                        }
                    }, 5000);
                }
                if (this.started && !this.isPlaying) {
                    return Promise.reject(new Error("The currently loading song isn't playing yet."));
                } else {
                    this.list.splice(position, 1);
                    return Promise.resolve(request);
                }
            } else {
                return Promise.reject(new Error("The queue is empty."));
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
            var _this4 = this;

            this.started = true;
            var loadMessage = undefined;
            var stream = ytdl(request.link, ["--format=bestaudio[abr<=192]/best"]);
            stream.on("info", function (info, format) {
                if (loadMessage) {
                    _this4.bot.client.deleteMessage(loadMessage).catch(function (error) {
                        return console.error(error);
                    });
                }
                Logger_1.default.announce(_this4.bot, "Now Playing: `" + request.title + "`.");
                _this4.bot.client.setPlayingGame(info.title).catch(function (error) {
                    return console.error(error);
                });
            });
            stream.on("error", function (error) {
                Logger_1.default.error(_this4.bot, "Unknown Error:\n\n```" + error.message + "```", error);
                _this4.remRequest(0);
            });
            Logger_1.default.announce(this.bot, "Loading: `" + request.title + "`...").then(function (message) {
                return loadMessage = message;
            });
            this.bot.client.voiceConnection.playRawStream(stream).then(function (intent) {
                _this4.isPlaying = true;
                intent.on("error", function (error) {
                    return console.error(error);
                });
                intent.on("end", function () {
                    if (_this4.veto) {
                        _this4.veto = false;
                    } else {
                        _this4.remRequest(0);
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
