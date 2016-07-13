"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
import Queue from "../Queue";
import Command from "../Interfaces/Command";

class List implements Command {
	usage: string = "%cmd%";
	description: string = "List the queue.";
	args: number = 0;
	staff: boolean = false;

	queue: Queue;

	constructor(queue: Queue){
		this.queue = queue;
	}

	onCommand(bot: Bot, message: any, args: string[]): void {
		let body: string = "";

		if (this.queue.list.length === 0){
			Logger.error(bot, "There isn't anything in the queue.");
		} else {
			for (let request of this.queue.list){
				body += "\n" + (this.queue.list.indexOf(request) + 1) + ". `" + (request.shortTitle ? request.shortTitle : request.title) + " [" + request.durationAsString + "]`, requested by `" + bot.client.users.get("id", request.requester).username + "`.";
			}

			Logger.message(bot, "Queue List:\n\n" + body.replace("\n", ""));
		}
	}
}

export default List;
