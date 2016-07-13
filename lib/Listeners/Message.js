"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger_1 = require("../Logger");

var Message = function () {
    function Message(commands) {
        _classCallCheck(this, Message);

        this.commands = commands;
    }

    _createClass(Message, [{
        key: "onBotEvent",
        value: function onBotEvent(bot, message) {
            var text = message.content;
            if (text.toLowerCase().startsWith(bot.config.commandPrefix)) {
                if (bot.config.linked.text && message.channel.id === bot.config.linked.text) {
                    var command = text.split(" ")[0].replace(bot.config.commandPrefix, "").toLowerCase();
                    var args = text.split(" ");
                    args.splice(0, 1);
                    if (command === "help") {
                        var header = "```\ndJdiscord, running version " + require("../../package.json").version + "\n\n";
                        var contents = "";
                        for (var _command in this.commands.commands) {
                            var obj = this.commands.commands[_command];
                            contents += obj.usage.replace("%cmd%", bot.config.commandPrefix + _command) + "\n";
                            contents += "  " + obj.description + "\n";
                            if (obj.staff) {
                                contents += "  STAFF ONLY\n";
                            }
                            contents += "\n";
                        }
                        Logger_1.default.message(bot, "Help Information:\n\n" + header + contents + "```");
                    } else {
                        if (Object.keys(this.commands.commands).indexOf(command.toLowerCase()) > -1) {
                            if (this.commands.commands[command].args <= args.length) {
                                console.log("Command: " + bot.config.commandPrefix + command + ", User: " + message.author.username);
                                this.commands.commands[command].onCommand(bot, message, args);
                            } else {
                                Logger_1.default.message(bot, "Usage: `" + bot.config.commandPrefix + this.commands.commands[command].usage.replace("%cmd%", command) + "`");
                            }
                        } else {
                            Logger_1.default.error(bot, "That command doesn't exist! Try running `" + bot.config.commandPrefix + "help` for a list of commands.");
                        }
                    }
                } else if (bot.config.linked.text) {
                    Logger_1.default.error(bot, "Please refer your music requests to <#" + bot.config.linked.text + ">.");
                }
            }
            if (text.toLowerCase() === bot.client.user.mention() + " are you my waifu" && message.author.id === "87353905251377152") {
                Logger_1.default.bare(bot, "Yes, my love.", message.channel);
            }
            if (bot.client.userHasRole(message.author, bot.config.staffRole)) {
                var cont = false;
                if (text.toLowerCase() === bot.client.user.mention() + " listen here") {
                    bot.config.linked.text = message.channel.id;
                    cont = true;
                } else if (text.toLowerCase().startsWith(bot.client.user.mention() + " play music in ")) {
                    var name = text.split(bot.client.user.mention() + " play music in ").join("");
                    var channels = bot.client.channels.getAll("name", name);
                    if (channels.length > 0) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = channels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var channel = _step.value;

                                if (channel.type === "voice") {
                                    bot.config.linked.voice = channel.id;
                                    cont = true;
                                    bot.client.joinVoiceChannel(channel.id).catch(function (error) {
                                        return console.error(error);
                                    });
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
                if (cont) {
                    bot.config.saveLinked();
                    Logger_1.default.bare(bot, ":white_check_mark:", message.channel);
                }
            }
        }
    }]);

    return Message;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Message;
//# sourceMappingURL=Message.js.map
