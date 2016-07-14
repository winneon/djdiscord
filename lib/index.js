"use strict";
// Source Map Redirection

require("source-map-support").install();
// Native Node Imports
var path = require("path");
var fs = require("fs");
// Local TS Imports
var Bot_1 = require("./Bot");
var Commands_1 = require("./Commands");
var Logger_1 = require("./Logger");
var Listeners_1 = require("./Listeners");
var Queue_1 = require("./Queue");
// Bot Listener Imports
var Message_1 = require("./Listeners/Message");
var Ready_1 = require("./Listeners/Ready");
var VoiceSpeaking_1 = require("./Listeners/VoiceSpeaking");
// Bot Command Imports
var Add_1 = require("./Commands/Add");
var Drop_1 = require("./Commands/Drop");
var List_1 = require("./Commands/List");
var Pause_1 = require("./Commands/Pause");
var Playing_1 = require("./Commands/Playing");
var Resume_1 = require("./Commands/Resume");
var Veto_1 = require("./Commands/Veto");
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
var queue = new Queue_1.default(bot);
listeners.register(new Message_1.default(commands));
listeners.register(new Ready_1.default());
listeners.register(new VoiceSpeaking_1.default());
commands.register(new List_1.default(queue));
commands.register(new Playing_1.default(queue));
commands.register(new Add_1.default(queue));
commands.register(new Drop_1.default(queue));
commands.register(new Pause_1.default());
commands.register(new Resume_1.default());
commands.register(new Veto_1.default(queue));
bot.login(bot.config.token);
process.stdin.resume();
process.on("SIGINT", function () {
    function logout() {
        bot.client.logout();
        process.exit(0);
    }
    console.log("Terminating...");
    Logger_1.default.message(bot, "Terminating...").then(function (message) {
        return logout();
    }).catch(function (error) {
        return logout();
    });
});
//# sourceMappingURL=index.js.map
