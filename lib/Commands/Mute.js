"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mute = function () {
    function Mute() {
        _classCallCheck(this, Mute);

        this.usage = "%cmd%";
        this.description = "Mute the dJ.";
        this.args = 0;
        this.staff = true;
    }

    _createClass(Mute, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {}
    }]);

    return Mute;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Mute;
//# sourceMappingURL=Mute.js.map
