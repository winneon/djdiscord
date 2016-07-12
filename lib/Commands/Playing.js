"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Playing = function () {
    function Playing(queue) {
        _classCallCheck(this, Playing);

        this.usage = "%cmd%";
        this.description = "Display the currently playing song.";
        this.args = 0;
        this.staff = false;
        this.queue = queue;
    }

    _createClass(Playing, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            bot.sendMessage(message.channel, {
                message: this.queue.isPlaying ? this.queue.currentlyPlaying : "There isn't anything currently playing."
            });
        }
    }]);

    return Playing;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Playing;
//# sourceMappingURL=Playing.js.map
