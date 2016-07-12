"use strict";

// Native Node Imports
let path: any = require("path");
let fs: any = require("fs");

// Local TS Imports
import Config from "./Config";
import Bot from "./Bot";
import Listeners from "./Listeners";
import Commands from "./Commands";
import Queue from "./Queue";

// Bot Listener Imports
import Message from "./Listeners/Message";
import Ready from "./Listeners/Ready";
import VoiceSpeaking from "./Listeners/VoiceSpeaking";

// Bot Command Imports
import List from "./Commands/List";
import Playing from "./Commands/Playing";
import Add from "./Commands/Add";
import Pause from "./Commands/Pause";
import Resume from "./Commands/Resume";
import Veto from "./Commands/Veto";

require("console-stamp")(console, {
	pattern: "HH:MM:ss mmm/dd",
	metadata: "[dJdiscord]",
	colors: {
		stamp: "yellow",
		label: "grey",
		metadata: "green"
	}
});

let bot: Bot = new Bot();
let listeners: Listeners = new Listeners(bot);
let commands: Commands = new Commands(bot);
let queue: Queue = new Queue(bot);

listeners.register(new Message(commands));
listeners.register(new Ready());
listeners.register(new VoiceSpeaking());

commands.register(new List(queue));
commands.register(new Playing(queue));
commands.register(new Add(queue));
commands.register(new Pause());
commands.register(new Resume());
commands.register(new Veto(queue));

bot.login(bot.config.token);

process.stdin.resume();
process.on("SIGINT", () => {
	console.log("Terminating...");
	bot.client.logout();

	process.exit();
});
