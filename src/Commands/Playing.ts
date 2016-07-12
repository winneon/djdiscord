"use strict";

// Local TS Imports
import Bot from "../Bot";
import Queue from "../Queue";
import Command from "../Interfaces/Command";

class Playing implements Command {
	usage: string = "%cmd%";
	description: string = "Display the currently playing song.";
	args: number = 0;
	staff: boolean = false;

	queue: Queue;

	constructor(queue: Queue){
		this.queue = queue;
	}

	onCommand(bot: Bot, message: any, args: string[]): void {
		bot.sendMessage(message.channel, {
			message: this.queue.isPlaying ? this.queue.currentlyPlaying : "There isn't anything currently playing."
		});
	}
}

export default Playing;
