"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Listeners = function () {
    function Listeners(bot) {
        _classCallCheck(this, Listeners);

        this.bot = bot;
    }

    _createClass(Listeners, [{
        key: "register",
        value: function register(listener) {
            var _this = this;

            this.bot.client.on(listener.constructor.name.toLowerCase(), function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                args.unshift(_this.bot);
                listener.onBotEvent.apply(listener, args);
            });
        }
    }]);

    return Listeners;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Listeners;
//# sourceMappingURL=Listeners.js.map
