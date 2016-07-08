"use strict";
// External Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ytdl = require("ytdl-core");
// Native Node Imports
var fs = require("fs");

var Add = function () {
    function Add() {
        _classCallCheck(this, Add);

        this.usage = "%cmd% <link>";
        this.description = "Add a song to the dJ queue.";
        this.args = 1;
        this.staff = false;
        this.title = "";
    }

    _createClass(Add, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            var _this = this;

            var stream = ytdl(args[0]);
            // This will always run first in ytdl-core, so I don't need to worry about waiting for this.title.
            stream.on("info", function (info, format) {
                _this.title = info.title;
                bot.client.setPlayingGame(info.title);
            });
            stream.on("response", function (res) {
                if (res.statusCode === 200) {
                    bot.sendMessage(message.channel, {
                        message: "Enqueued `" + _this.title + "` at position `1`.",
                        mention: message.author
                    });
                }
            });
            bot.client.voiceConnection.playRawStream(stream);
        }
    }]);

    return Add;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Add;
//# sourceMappingURL=Add.js.map
