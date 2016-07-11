"use strict";

// Native Node Imports
let fs: any = require("fs");

// Local TS Imports
import Bot from "../Bot";
import Commands from "../Commands";
import Listener from "../Interfaces/Listener";

class Ready implements Listener {
	onBotEvent(bot: Bot): void {
		if (bot.config.linked.voice){
			bot.client.joinVoiceChannel(bot.config.linked.voice, (error, connection) => {
				if (error){
					console.error("An error occurred connecting to the default voice channel.");
					console.error(error);
				}
			});
		}

		bot.client.setPlayingGame(null, (error) => {
			if (error){
				console.error("An error occurred resetting the song status.");
				console.error(error);
			}
		});

		console.log("Ready and listening for commands.");
	}
}

export default Ready;
