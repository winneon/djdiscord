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

		if (voice.playing){
			voice.pause();

			bot.sendMessage(message.channel, {
				message: "Paused!",
				mention: message.author
			});
		} else {
			bot.sendMessage(message.channel, {
				message: "There isn't anything currently playing.",
				mention: message.author
			});
		}
	}
}

export default Pause;
