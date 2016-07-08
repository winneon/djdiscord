"use strict";

// Local TS Imports
import Bot from "./Bot";
import Listener from "./Interfaces/Listener";

class Listeners {
	bot: Bot;

	constructor(bot: Bot){
		this.bot = bot;
	}

	register(listener: Listener): void {
		this.bot.client.on(listener.constructor.name.toLowerCase(), (...args: any[]) => {
			args.unshift(this.bot);
			listener.onBotEvent.apply(listener, args);
		});
	}
}

export default Listeners;
