"use strict";

// Local TS Imports
import Bot from "../Bot";
import Queue from "../Queue";
import Command from "../Interfaces/Command";

class Veto implements Command {
	usage: string = "%cmd%";
	description: string = "Veto the currently playing song.";
	args: number = 0;
	staff: boolean = true;

	queue: Queue;

	constructor(queue: Queue){
		this.queue = queue;
	}

	onCommand(bot: Bot, message: any, args: string[]): void {
		this.queue.remRequest(0, (error, request) => {
			bot.sendMessage(message.channel, {
				message: error ? "There isn't anything currently playing." : "Vetoed `" + request.title + "`."
			});
		});
	}
}

export default Veto;
