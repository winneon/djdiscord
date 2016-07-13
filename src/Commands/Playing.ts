"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
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
		if (this.queue.list.length > 0){
			Logger.announce(bot, this.queue.currentlyPlaying);
		} else {
			Logger.error(bot, this.queue.currentlyPlaying);
		}
	}
}

export default Playing;
