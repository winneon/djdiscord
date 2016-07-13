"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Commands = function () {
    function Commands(bot) {
        _classCallCheck(this, Commands);

        this.bot = bot;
        this.commands = {};
    }

    _createClass(Commands, [{
        key: "register",
        value: function register(command) {
            this.commands[command.constructor.name.toLowerCase()] = command;
        }
    }]);

    return Commands;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Commands;
//# sourceMappingURL=Commands.js.map
