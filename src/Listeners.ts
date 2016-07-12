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
		let name: string = listener.constructor.name;
		name = name.charAt(0).toLowerCase() + name.slice(1);

		this.bot.client.on(name, (...args: any[]) => {
			args.unshift(this.bot);
			listener.onBotEvent.apply(listener, args);
		});
	}
}

export default Listeners;
