"use strict";

// Local TS Imports
import Bot from "../Bot";
import Commands from "../Commands";
import Listener from "../Interfaces/Listener";

class Message implements Listener {
	commands: Commands;

	constructor(commands: Commands){
		this.commands = commands;
	}

	onBotEvent(bot: Bot, message: any): void {
		let text: string = message.content;

		if (text.toLowerCase().startsWith(bot.config.commandPrefix)){
			let command: string = text.split(" ")[0].replace(bot.config.commandPrefix, "").toLowerCase();
			let args: string[] = text.split(" ");

			args.splice(0, 1);

			if (command === "help"){
				//this.bot.getBot().deleteMessage(message);
				bot.sendMessage(message.channel, {
					message: this.commands.help
				});
			} else {
				if (Object.keys(this.commands.commands).indexOf(command.toLowerCase()) > -1){
					if (this.commands.commands[command].args <= args.length){
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
}

export default Message;
