"use strict";

// Local TS Imports
import Bot from "../Bot";
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

			bot.sendMessage(message.channel, {
				message: ":arrow_forward:"
			});
		} else {
			bot.sendMessage(message.channel, {
				message: "There isn't anything currently playing."
			});
		}
	}
}

export default Resume;
