"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function Config() {
    _classCallCheck(this, Config);

    var config = require("../config.json");
    try {
        this.commandPrefix = config.command_prefix;
        this.defaultVoiceChannel = config.default_voice_channel;
        this.token = config.token;
    } catch (e) {
        console.error("The provided config is invalid. Please create a proper config from the example.");
        process.exit(1);
    }
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Config;