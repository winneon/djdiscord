"use strict";

var config = require("./config");

function Commands(bot){
	if (!(this instanceof Commands)){
		return new Commands(bot);
	}

	this.bot = bot;
	this.commands = { };

	this.bot.getBot().on("message", (message) => {
		var text = message.content;

		if (text.toLowerCase().startsWith(config.command_prefix)){
			var command = text.split(" ")[0].replace(config.command_prefix, "").toLowerCase();
			var args = text.split(" ");

			args.splice(0, 1);

			if (command === "help"){
				this.bot.sendMessage(message.channel, {
					message: this.getHelp()
				});
			} else {
				if (Object.keys(this.commands).indexOf(command) > -1){
					this._checkCommand(command, message, args);
				} else {
					this.bot.sendMessage(message.channel, {
						message: "That command doesn't exist! Try running `" + config.command_prefix + "help` for a list of commands.",
						mention: message.author
					});
				}
			}
		}
	});
}


Commands.prototype._checkCommand = function(command, message, args){
	if (this.commands[command].argCount <= args.length){
		console.log("Command: " + config.command_prefix + command);
		this.commands[command].runCommand(message, args);
	} else {
		this.bot.sendMessage(message.channel, {
			message: "```Usage: " + config.command_prefix + this.commands[command].usage.replace("%cmd%", command) + "```"
		});
	}
}

Commands.prototype.getHelp = function(){
	var header = "```\n" +
	"dJdiscord, running version " + require("../package.json").version + "\n" +
	"\n";

	var contents = "";

	for (var command in this.commands){
		var commandObj = this.commands[command];

		contents += commandObj.usage.replace("%cmd%", config.command_prefix + command) + "\n";
		contents += "  " + commandObj.description + "\n";

		if (commandObj.staff){
			contents += "  STAFF ONLY\n";
		}

		contents += "\n";
	}

	var footer = "```";

	return header + contents + footer;
};

Commands.prototype.registerCommand = function(command){
	try {
		this.commands[command] = require("./commands/" + command)(this.bot);
	} catch (error){
		console.error("The command " + command + " doesn't exist!");
	}
};

module.exports = Commands;
