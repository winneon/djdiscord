"use strict";

// Local TS Imports
import Bot from "../Bot";
import Commands from "../Commands";
import Logger from "../Logger";
import Listener from "../Interfaces/Listener";

class Message implements Listener {
	commands: Commands;

	constructor(commands: Commands){
		this.commands = commands;
	}

	onBotEvent(bot: Bot, message: any): void {
		let text: string = message.content;

		if (text.toLowerCase().startsWith(bot.config.commandPrefix)){
			if (bot.config.linked.text && message.channel.id === bot.config.linked.text){
				let command: string = text.split(" ")[0].replace(bot.config.commandPrefix, "").toLowerCase();
				let args: string[] = text.split(" ");

				args.splice(0, 1);

				if (command === "help"){
					let header: string = "```\ndJdiscord, running version " + require("../../package.json").version + "\n\n";
					let contents: string = "";

					for (let command in this.commands.commands){
						let obj = this.commands.commands[command];

						contents += obj.usage.replace("%cmd%", bot.config.commandPrefix + command) + "\n";
						contents += "  " + obj.description + "\n";

						if (obj.staff){
							contents += "  STAFF ONLY\n";
						}

						contents += "\n";
					}

					Logger.message(bot, "Help Information:\n\n" + header + contents + "```");
				} else {
					if (Object.keys(this.commands.commands).indexOf(command.toLowerCase()) > -1){
						if (this.commands.commands[command].args <= args.length){
							console.log("Command: " + bot.config.commandPrefix + command + ", User: " + message.author.username);
							this.commands.commands[command].onCommand(bot, message, args);
						} else {
							Logger.message(bot, "Usage: `" + bot.config.commandPrefix + this.commands.commands[command].usage.replace("%cmd%", command) + "`")
						}
					} else {
						Logger.error(bot, "That command doesn't exist! Try running `" + bot.config.commandPrefix + "help` for a list of commands.");
					}
				}
			} else if (bot.config.linked.text){
				//Logger.error(bot, "Please refer your music requests to <#" + bot.config.linked.text + ">.");
			}
		}

		if (text.toLowerCase() === bot.client.user.mention() + " are you my waifu" && message.author.id === "87353905251377152"){
			Logger.bare(bot, "Yes, my love. :heartpulse:", message.channel);
		}

		if (bot.client.userHasRole(message.author, bot.config.staffRole)){
			let cont: boolean = false;

			if (text.toLowerCase() === bot.client.user.mention() + " listen here"){
				bot.config.linked.text = message.channel.id;
				cont = true;
			} else if (text.toLowerCase().startsWith(bot.client.user.mention() + " play music in ")){
				let name: string = text.split(bot.client.user.mention() + " play music in ").join("");
				let channels: any[] = bot.client.channels.getAll("name", name);

				if (channels.length > 0){
					for (let channel of channels){
						if (channel.type === "voice"){
							bot.config.linked.voice = channel.id;
							cont = true;
							
							bot.client.joinVoiceChannel(channel.id)
								.catch(error => console.error(error));

							break;
						}
					}
				}
			}

			if (cont){
				bot.config.saveLinked();
				Logger.bare(bot, ":white_check_mark:", message.channel);
			}
		}
	}
}

export default Message;
