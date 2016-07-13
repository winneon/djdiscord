"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
import Command from "../Interfaces/Command";

class Resume implements Command {
	usage: string = "%cmd%";
	description: string = "Resume the currently playing song."
	args: number = 0;
	staff: boolean = true;

	onCommand(bot: Bot, message: any, args: string[]): void {
		let voice = bot.client.voiceConnection;

		if (voice.paused){
			voice.resume();
			Logger.bare(bot, ":arrow_forward:")
		} else {
			Logger.error(bot, "There is nothing playing.");
		}
	}
}

export default Resume;
