"use strict";

// Native Node Imports
let fs: any = require("fs");

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
import Listener from "../Interfaces/Listener";

class Ready implements Listener {
	onBotEvent(bot: Bot): void {
		if (bot.config.linked.voice){
			bot.client.joinVoiceChannel(bot.config.linked.voice)
				.catch(error => console.error(error));
		}

		bot.client.setPlayingGame(null)
			.catch(error => console.error(error));

		Logger.message(bot, "Ready and listening for commands.");
		console.log("Ready and listening for commands.");
	}
}

export default Ready;
