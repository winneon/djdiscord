"use strict";
// Native Node Imports

var path = require("path");
var fs = require("fs");
var Bot_1 = require("./Bot");
var Listeners_1 = require("./Listeners");
var Commands_1 = require("./Commands");
// Bot Listener Imports
var Message_1 = require("./Listeners/Message");
var Ready_1 = require("./Listeners/Ready");
// Bot Command Imports
var Add_1 = require("./Commands/Add");
var Pause_1 = require("./Commands/Pause");
require("console-stamp")(console, {
    pattern: "HH:MM:ss mmm/dd",
    metadata: "[dJdiscord]",
    colors: {
        stamp: "yellow",
        label: "grey",
        metadata: "green"
    }
});
var bot = new Bot_1.default();
var listeners = new Listeners_1.default(bot);
var commands = new Commands_1.default(bot);
listeners.register(new Message_1.default(commands));
listeners.register(new Ready_1.default());
commands.register(new Add_1.default());
commands.register(new Pause_1.default());
bot.login(bot.config.token);
process.stdin.resume();
process.on("SIGINT", function () {
    console.log("Terminating...");
    bot.client.logout();
    process.exit();
});
//# sourceMappingURL=index.js.map
