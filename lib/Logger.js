"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoggerType;
(function (LoggerType) {
    LoggerType[LoggerType["MESSAGE"] = 0] = "MESSAGE";
    LoggerType[LoggerType["ANNOUNCE"] = 1] = "ANNOUNCE";
    LoggerType[LoggerType["ERROR"] = 2] = "ERROR";
})(LoggerType || (LoggerType = {}));

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, null, [{
        key: "bare",
        value: function bare(bot, message, channel) {
            if (channel || bot.config.linked.text) {
                bot.client.stopTyping(channel ? channel : bot.config.linked.text);
                return bot.client.sendMessage(channel ? channel : bot.config.linked.text, message).catch(function (error) {
                    return console.error(error);
                });
            } else {
                return undefined;
            }
        }
    }, {
        key: "message",
        value: function message(bot, _message) {
            var type = arguments.length <= 2 || arguments[2] === undefined ? LoggerType.MESSAGE : arguments[2];

            var emoji = void 0;
            switch (type) {
                case LoggerType.MESSAGE:
                default:
                    emoji = ":notepad_spiral:";
                    break;
                case LoggerType.ANNOUNCE:
                    emoji = ":notes:";
                    break;
                case LoggerType.ERROR:
                    emoji = ":no_entry_sign:";
                    break;
            }
            return Logger.bare(bot, emoji + " | `" + LoggerType[type] + "` | " + _message);
        }
    }, {
        key: "announce",
        value: function announce(bot, message) {
            return Logger.message(bot, message, LoggerType.ANNOUNCE);
        }
    }, {
        key: "error",
        value: function error(bot, message, _error) {
            if (_error) console.error(_error);
            return Logger.message(bot, message, LoggerType.ERROR);
        }
    }]);

    return Logger;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Logger;
//# sourceMappingURL=Logger.js.map
