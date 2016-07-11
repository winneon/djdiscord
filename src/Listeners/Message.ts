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

		if (bot.config.linked.text && message.channel.id === bot.config.linked.text){
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
							console.log("Command: " + bot.config.commandPrefix + command + ", User: " + message.author.username);
							this.commands.commands[command].onCommand(bot, message, args);
						} else {
							bot.sendMessage(message.channel, {
								message: "```Usage: " + bot.config.commandPrefix + this.commands.commands[command].usage.replace("%cmd%", command) + "```"
							});
						}
					} else {
						bot.sendMessage(message.channel, {
							message: "That command doesn't exist! Try running `" + bot.config.commandPrefix + "help` for a list of commands."
						});
					}
				}
			}
		}

		if (text.toLowerCase() === bot.client.user.mention() + " are you my waifu" && message.author.id === "87353905251377152"){
			bot.sendMessage(message.channel, {
				message: "Yes, my love.",
				mention: message.author
			});
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
							
							bot.client.joinVoiceChannel(channel.id, (error, connection) => {
								if (error){
									console.error("An error occurred connecting to a voice channel");
									console.error(error);
								}
							});

							break;
						}
					}
				}
			}

			if (cont){
				bot.config.saveLinked();
			
				bot.sendMessage(message.channel, {
					message: ":white_check_mark:"
				});
			}
		}
	}
}

export default Message;
