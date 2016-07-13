"use strict";

// Local TS Imports
import Bot from "./Bot";
import Command from "./Interfaces/Command";

class Commands {
	bot: Bot;
	commands: any;

	constructor(bot: Bot){
		this.bot = bot;
		this.commands = { };
	}

	register(command: Command): void {
		this.commands[command.constructor.name.toLowerCase()] = command;
	}
}

export default Commands;
