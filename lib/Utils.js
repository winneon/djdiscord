"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "stripID",
        value: function stripID(id) {
            return id.replace(/\D/g, "");
        }
    }, {
        key: "secondsAsString",
        value: function secondsAsString(secs) {
            return Number.isNaN(secs) ? "NaN" : new Date(secs * 1000).toISOString().substr(11, 8);
        }
    }]);

    return Utils;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;
//# sourceMappingURL=Utils.js.map
