"use strict";

// External Node Imports
let ytdl: any = require("ytdl-core");

// Native Node Imports
let fs: any = require("fs");

// Local TS Imports
import Bot from "../Bot";
import Command from "../Interfaces/Command";

class Add implements Command {
	usage: string = "%cmd% <link>";
	description: string = "Add a song to the dJ queue.";
	args: number = 1;
	staff: boolean = false;

	title: string = "";

	onCommand(bot: Bot, message: any, args: string[]): void {
		let stream: any = ytdl(args[0]);

		// This will always run first in ytdl-core, so I don't need to worry about waiting for this.title.
		stream.on("info", (info, format) => {
			this.title = info.title;
			bot.client.setPlayingGame(info.title);
		});

		stream.on("response", (res) => {
			if (res.statusCode === 200){
				bot.sendMessage(message.channel, {
					message: "Enqueued `" + this.title + "` at position `1`.",
					mention: message.author
				});
			}
		});

		bot.client.voiceConnection.playRawStream(stream);
	}
}

export default Add;
