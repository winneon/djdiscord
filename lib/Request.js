"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = function () {
    function Request(options) {
        _classCallCheck(this, Request);

        this.title = options.title;
        this.link = options.link;
        this.requester = options.requester;
        this.duration = options.duration;
    }

    _createClass(Request, [{
        key: "durationAsString",
        get: function get() {
            // Credit to http://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript#comment57297644_25279340.
            return new Date(this.duration * 1000).toISOString().substr(11, 8);
        }
    }]);

    return Request;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Request;
//# sourceMappingURL=Request.js.map
