"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
                var command = text.split(" ")[0].replace(bot.config.commandPrefix, "").toLowerCase();
                var args = text.split(" ");
                args.splice(0, 1);
                if (command === "help") {
                    //this.bot.getBot().deleteMessage(message);
                    bot.sendMessage(message.channel, {
                        message: this.commands.help
                    });
                } else {
                    if (Object.keys(this.commands.commands).indexOf(command.toLowerCase()) > -1) {
                        if (this.commands.commands[command].args <= args.length) {
                            console.log("Command: " + bot.config.commandPrefix + command);
                            this.commands.commands[command].onCommand(bot, message, args);
                        } else {
                            bot.sendMessage(message.channel, {
                                message: "```Usage: " + bot.config.commandPrefix + this.commands.commands[command].usage.replace("%cmd%", command) + "```"
                            });
                        }
                    } else {
                        bot.sendMessage(message.channel, {
                            message: "That command doesn't exist! Try running `" + bot.config.commandPrefix + "help` for a list of commands.",
                            mention: message.author
                        });
                    }
                }
            }
        }
    }]);

    return Message;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Message;
//# sourceMappingURL=Message.js.map
