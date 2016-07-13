"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger_1 = require("../Logger");

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
            if (voice.playing && !voice.paused) {
                voice.pause();
                Logger_1.default.bare(bot, ":pause_button:");
            } else {
                Logger_1.default.error(bot, "There is nothing playing.");
            }
        }
    }]);

    return Pause;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Pause;
//# sourceMappingURL=Pause.js.map
