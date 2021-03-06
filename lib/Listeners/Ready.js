"use strict";
// Native Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");
var Logger_1 = require("../Logger");

var Ready = function () {
    function Ready() {
        _classCallCheck(this, Ready);
    }

    _createClass(Ready, [{
        key: "onBotEvent",
        value: function onBotEvent(bot) {
            if (bot.config.linked.voice) {
                bot.client.joinVoiceChannel(bot.config.linked.voice).catch(function (error) {
                    return console.error(error);
                });
            }
            bot.client.setPlayingGame(null).catch(function (error) {
                return console.error(error);
            });
            Logger_1.default.message(bot, "Ready and listening for commands.");
            console.log("Ready and listening for commands.");
        }
    }]);

    return Ready;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ready;
//# sourceMappingURL=Ready.js.map
