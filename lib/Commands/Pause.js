"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pause = function () {
    function Pause() {
        _classCallCheck(this, Pause);

        this.usage = "%cmd%";
        this.description = "Pause the currently playing song.";
        this.args = 0;
        this.staff = true;
    }

    _createClass(Pause, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            var voice = bot.client.voiceConnection;
            if (voice.playing) {
                voice.pause();
                bot.sendMessage(message.channel, {
                    message: "Paused!",
                    mention: message.author
                });
            } else {
                bot.sendMessage(message.channel, {
                    message: "There isn't anything currently playing.",
                    mention: message.author
                });
            }
        }
    }]);

    return Pause;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pause;
//# sourceMappingURL=Pause.js.map
