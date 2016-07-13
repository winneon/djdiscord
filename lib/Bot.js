"use strict";
// External Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var discord = require("discord.js");
// Native Node Imports
var path = require("path");
var fs = require("fs");
// Local TS Imports
var Config_1 = require("./Config");

var Bot = function () {
    function Bot() {
        _classCallCheck(this, Bot);

        this.config = new Config_1.default();
        this.discord = discord;
        this.client = new discord.Client({
            rateLimitAsError: true,
            autoReconnect: true
        });
    }

    _createClass(Bot, [{
        key: "login",
        value: function login(token) {
            console.log("Attempting to login...");
            this.client.loginWithToken(token).then(function (token) {
                return console.log("Successfully logged in.");
            }).catch(function (error) {
                console.error(error);
                process.exit(1);
            });
        }
    }]);

    return Bot;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bot;
//# sourceMappingURL=Bot.js.map
