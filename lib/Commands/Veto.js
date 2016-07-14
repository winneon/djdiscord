"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger_1 = require("../Logger");

var Veto = function () {
    function Veto(queue) {
        _classCallCheck(this, Veto);

        this.usage = "%cmd%";
        this.description = "Veto the currently playing song.";
        this.args = 0;
        this.staff = true;
        this.queue = queue;
    }

    _createClass(Veto, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            this.queue.remRequest(0).then(function (request) {
                return Logger_1.default.message(bot, "Vetoed `" + request.title + "`.");
            }).catch(function (error) {
                return Logger_1.default.error(bot, error.message);
            });
        }
    }]);

    return Veto;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Veto;
//# sourceMappingURL=Veto.js.map
