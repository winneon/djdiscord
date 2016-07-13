"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
import Command from "../Interfaces/Command";

class Pause implements Command {
	usage: string = "%cmd%";
	description: string = "Pause the currently playing song."
	args: number = 0;
	staff: boolean = true;

	onCommand(bot: Bot, message: any, args: string[]): void {
		let voice = bot.client.voiceConnection;

		if (voice.playing && !voice.paused){
			voice.pause();
			Logger.bare(bot, ":pause_button:");
		} else {
			Logger.error(bot, "There is nothing playing.");
		}
	}
}

export default Pause;
