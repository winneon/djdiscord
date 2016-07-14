"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
import Queue from "../Queue";
import Request from "../Request";
import Command from "../Interfaces/Command";

class Drop implements Command {
	usage: string = "%cmd% [<position> | [all]]";
	description: string = "Drop a or all of the songs you've requested.";
	args: number = 0;
	staff: boolean = false;

	queue: Queue;

	constructor(queue: Queue){
		this.queue = queue;
	}

	onCommand(bot: Bot, message: any, args: string[]): void {
		if (args.length === 0 || args[0] === "all" || !Number.isNaN(Number(args[0]))){
			if (args.length === 0 || args[0] === "all"){
				this.queue.remRequests(message.author.id)
					.then(array => Logger.announce(bot, "Dropped all of `" + message.author.username + "`'s requests."))
					.catch(error => Logger.error(bot, error.message));
			} else {
				if (!this.queue.list[Number(args[0]) - 1]){
					Logger.error(bot, "There is no request with that position in the queue.");
				} else {
					if (this.queue.getRequests(message.author.id).length > 0){
						if (this.queue.list[Number(args[0]) - 1].requester === message.author.id){
							this.queue.remRequest(Number(args[0]) - 1)
								.then(request => Logger.announce(bot, "Dropped `" + request.title + "`."))
								.catch(error => Logger.error(bot, error.message));
						} else {
							let request = this.queue.list[Number(args[0]) - 1];
							Logger.error(bot, "`" + message.author.username + "` did not request `" + request.shortTitle ? request.shortTitle : request.title + "`.");
						}
					} else {
						Logger.error(bot, "`" + message.author.username + "` has no requests in the queue.")
					}
				}
			}
		} else {
			Logger.error(bot, "Invalid argument.");
		}
	}
}

export default Drop;
