"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger_1 = require("../Logger");

var Drop = function () {
    function Drop(queue) {
        _classCallCheck(this, Drop);

        this.usage = "%cmd% [<position> | [all]]";
        this.description = "Drop a or all of the songs you've requested.";
        this.args = 0;
        this.staff = false;
        this.queue = queue;
    }

    _createClass(Drop, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            if (args.length === 0 || args[0] === "all" || !Number.isNaN(Number(args[0]))) {
                if (args.length === 0 || args[0] === "all") {
                    this.queue.remRequests(message.author.id).then(function (array) {
                        return Logger_1.default.announce(bot, "Dropped all of `" + message.author.username + "`'s requests.");
                    }).catch(function (error) {
                        return Logger_1.default.error(bot, error.message);
                    });
                } else {
                    if (!this.queue.list[Number(args[0]) - 1]) {
                        Logger_1.default.error(bot, "There is no request with that position in the queue.");
                    } else {
                        if (this.queue.getRequests(message.author.id).length > 0) {
                            if (this.queue.list[Number(args[0]) - 1].requester === message.author.id) {
                                this.queue.remRequest(Number(args[0]) - 1).then(function (request) {
                                    return Logger_1.default.announce(bot, "Dropped `" + request.title + "`.");
                                }).catch(function (error) {
                                    return Logger_1.default.error(bot, error.message);
                                });
                            } else {
                                var request = this.queue.list[Number(args[0]) - 1];
                                Logger_1.default.error(bot, "`" + message.author.username + "` did not request `" + request.shortTitle ? request.shortTitle : request.title + "`.");
                            }
                        } else {
                            Logger_1.default.error(bot, "`" + message.author.username + "` has no requests in the queue.");
                        }
                    }
                }
            } else {
                Logger_1.default.error(bot, "Invalid argument.");
            }
        }
    }]);

    return Drop;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Drop;
//# sourceMappingURL=Drop.js.map
