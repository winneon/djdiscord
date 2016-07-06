"use strict";

require("console-stamp")(console, {
	pattern: "HH:MM:ss mmm/dd",
	metadata: "[dJdiscord]",
	colors: {
		stamp: "yellow",
		label: "grey",
		metadata: "green"
	}
});

var config = require("./config");
var bot = require("./bot");

process.stdin.resume();

process.on("SIGINT", () => {
	console.log("Terminating...");

	bot.getBot().logout();

	process.exit();
});
