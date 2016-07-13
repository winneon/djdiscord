"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger_1 = require("../Logger");

var Resume = function () {
    function Resume() {
        _classCallCheck(this, Resume);

        this.usage = "%cmd%";
        this.description = "Resume the currently playing song.";
        this.args = 0;
        this.staff = true;
    }

    _createClass(Resume, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            var voice = bot.client.voiceConnection;
            if (voice.paused) {
                voice.resume();
                Logger_1.default.bare(bot, ":arrow_forward:");
            } else {
                Logger_1.default.error(bot, "There is nothing playing.");
            }
        }
    }]);

    return Resume;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Resume;
//# sourceMappingURL=Resume.js.map
