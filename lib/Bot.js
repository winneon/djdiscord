"use strict";
// External Node Imports

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
            this.client.loginWithToken(token, function (error, token) {
                if (error) {
                    console.error("An error occurred logging in to the bot.");
                    console.error(error);
                    process.exit(1);
                } else {
                    console.log("Successfully logged in.");
                }
            });
        }
    }, {
        key: "sendMessage",
        value: function sendMessage(channel, content, callback) {
            if (content.mention) {
                if (typeof content.mention === "string") {
                    content.mention = this.client.users.get("id", content.mention);
                }
                if (_typeof(content.mention) === "object") {
                    content.message = content.mention.mention() + " " + content.message;
                }
            }
            this.client.stopTyping(channel);
            this.client.sendMessage(channel, content.message, content.options, function (error, message) {
                if (error) {
                    console.error("An error occurred sending a message.");
                    console.error(error);
                } else if (callback) {
                    callback(message);
                }
            });
        }
    }]);

    return Bot;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Bot;
//# sourceMappingURL=Bot.js.map
