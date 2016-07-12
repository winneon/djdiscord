"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VoiceSpeaking = function () {
    function VoiceSpeaking() {
        _classCallCheck(this, VoiceSpeaking);
    }

    _createClass(VoiceSpeaking, [{
        key: "onBotEvent",
        value: function onBotEvent(bot, channel, user) {
            var voice = bot.client.voiceConnection;
            if (voice.voiceChannel.id === channel.id && bot.client.user.id !== user.id) {
                voice.setVolume(user.speaking ? 0.5 : 1.0);
            }
        }
    }]);

    return VoiceSpeaking;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VoiceSpeaking;
//# sourceMappingURL=VoiceSpeaking.js.map
