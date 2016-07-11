"use strict";

// Local TS Imports
import Bot from "../Bot";
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

			bot.sendMessage(message.channel, {
				message: ":pause_button:"
			});
		} else {
			bot.sendMessage(message.channel, {
				message: "There isn't anything currently playing."
			});
		}
	}
}

export default Pause;
