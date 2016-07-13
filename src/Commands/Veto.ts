"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
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
		let voice: any = bot.client.voiceConnection;

		this.queue.remRequest(0)
			.then(request => Logger.message(bot, "Vetoed `" + request.title + "`."))
			.catch(error => Logger.error(bot, error.message));
	}
}

export default Veto;
