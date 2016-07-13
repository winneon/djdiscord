"use strict";

// Native Node Imports
let fs: any = require("fs");

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
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

		this.queue.addRequest(require("valid-url").isUri(args[0]) ? args[0] : args.join(" "), message.author)
			.then((data) => {
				Logger.announce(bot, "Added song `" + (data.request.shortTitle ? data.request.shortTitle : data.request.title) + " [" + data.request.durationAsString + "]`, position `" + data.position + "`.");
			})
			.catch((error) => {
				if (error.message === "Invalid URL!"){
					Logger.error(bot, "Invalid URL. Supported sites: https://rg3.github.io/youtube-dl/supportedsites.html");
				} else {
					Logger.error(bot, "Unknown Error:\n\n```" + error.message + "```", error);
				}
			});
	}
}

export default Add;
