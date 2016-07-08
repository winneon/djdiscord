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

	get help(): string {
		let header: string = "```\ndJdiscord, running version " + require("../package.json").version + "\n\n";
		let contents: string = "";

		for (let command in this.commands){
			let obj = this.commands[command];

			contents += obj.usage.replace("%cmd%", this.bot.config.commandPrefix + command) + "\n";
			contents += "  " + obj.description + "\n";

			if (obj.staff){
				contents += "  STAFF ONLY\n";
			}

			contents += "\n";
		}

		let footer: string = "```";
		return header + contents + footer;
	}

	register(command: Command): void {
		this.commands[command.constructor.name.toLowerCase()] = command;
	}
}

export default Commands;
