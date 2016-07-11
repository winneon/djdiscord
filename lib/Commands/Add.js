"use strict";
// Native Node Imports

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require("fs");

var Add = function () {
    function Add(queue) {
        _classCallCheck(this, Add);

        this.usage = "%cmd% <link>";
        this.description = "Add a song to the dJ queue.";
        this.args = 1;
        this.staff = false;
        this.queue = queue;
    }

    _createClass(Add, [{
        key: "onCommand",
        value: function onCommand(bot, message, args) {
            bot.client.startTyping(message.channel);
            this.queue.addRequest(require("valid-url").isUri(args[0]) ? args[0] : args.join(" "), message.author, function (error, request, position) {
                if (error) {
                    if (error === "invalid") {
                        bot.sendMessage(message.channel, {
                            message: "You provided an invalid URL. Consult the youtube-dl docs for a list of supported sites.\nhttps://rg3.github.io/youtube-dl/supportedsites.html"
                        });
                    } else {
                        bot.sendMessage(message.channel, {
                            message: "```\n" + error + "\n```"
                        });
                    }
                } else {
                    bot.sendMessage(message.channel, {
                        message: "Enqueued `" + request.title + " [" + request.durationAsString + "]` at position `" + position + "`."
                    });
                }
            });
        }
    }]);

    return Add;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Add;
//# sourceMappingURL=Add.js.map
