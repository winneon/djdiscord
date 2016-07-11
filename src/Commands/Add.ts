"use strict";

// Native Node Imports
let fs: any = require("fs");

// Local TS Imports
import Bot from "../Bot";
import Queue from "../Queue";
import Command from "../Interfaces/Command";

class Add implements Command {
	usage: string = "%cmd% <link>";
	description: string = "Add a song to the dJ queue.";
	args: number = 1;
	staff: boolean = false;

	queue: Queue;

	constructor(queue: Queue){
		this.queue = queue;
	}

	onCommand(bot: Bot, message: any, args: string[]): void {
		bot.client.startTyping(message.channel);

		this.queue.addRequest(require("valid-url").isUri(args[0]) ? args[0] : args.join(" "), message.author, (error, request, position) => {
			if (error){
				if (error === "invalid"){
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
}

export default Add;
