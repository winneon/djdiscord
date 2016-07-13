"use strict";
// Local TS Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils_1 = require("./Utils");

var Request = function () {
    function Request(options) {
        _classCallCheck(this, Request);

        this.title = options.title;
        this.link = options.link;
        this.requester = options.requester;
        this.duration = options.duration;
        if (options.shortTitle) this.shortTitle = options.shortTitle;
    }

    _createClass(Request, [{
        key: "durationAsString",
        get: function get() {
            // Credit to http://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript#comment57297644_25279340.
            return Utils_1.default.secondsAsString(this.duration);
        }
    }]);

    return Request;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Request;
//# sourceMappingURL=Request.js.map
