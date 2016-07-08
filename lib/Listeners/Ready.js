"use strict";
// Native Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");

var Ready = function () {
    function Ready() {
        _classCallCheck(this, Ready);
    }

    _createClass(Ready, [{
        key: "onBotEvent",
        value: function onBotEvent(bot) {
            bot.authed = true;
            console.log("Loaded all metadata. Joining voice channel...");
            bot.client.joinVoiceChannel(bot.config.defaultVoiceChannel, function (error, connection) {
                if (error) {
                    console.error("An error occurred connecting to the default voice channel");
                    console.error(error);
                } else {
                    console.log("Joined. Resetting the status message...");
                    bot.client.setPlayingGame(undefined, function (error) {
                        bot.ready = true;
                        console.log("Ready and listening for commands.");
                    });
                }
            });
        }
    }]);

    return Ready;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ready;