"use strict";
// Native Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require("path");
var fs = require("fs");

var Config = function () {
    function Config() {
        _classCallCheck(this, Config);

        var config = undefined;
        try {
            config = require("../config.json");
            this.linked = {
                text: undefined,
                voice: undefined
            };
        } catch (e) {
            console.error("The provided config is invalid. Please create a proper config from the example.");
            process.exit(1);
        }
        if (config) {
            this.commandPrefix = config.command_prefix || process.env.DJ_COMMAND_PREFIX;
            this.token = config.token || process.env.DJ_TOKEN;
            this.staffRole = config.staff_role || process.env.DJ_STAFF_ROLE;
        } else {
            console.error("The config was not oaded properly. You probably did something bad.");
            process.exit(1);
        }
        var file = path.join(__dirname, "..", "linked.json");
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify({}, null, "\t"));
        }
        try {
            var defs = require(file);
            this.linked.text = defs.text || undefined;
            this.linked.voice = defs.voice || undefined;
        } catch (e) {
            console.error("The linked.json file is invalid. Please delete it before continuing.");
            console.error(e);
            process.exit(1);
        }
    }

    _createClass(Config, [{
        key: "saveLinked",
        value: function saveLinked() {
            fs.writeFileSync(path.join(__dirname, "..", "linked.json"), JSON.stringify(this.linked, null, "\t"));
        }
    }]);

    return Config;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Config;
//# sourceMappingURL=Config.js.map
