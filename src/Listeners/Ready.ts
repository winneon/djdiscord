"use strict";

// Native Node Imports
let fs: any = require("fs");

// Local TS Imports
import Bot from "../Bot";
import Commands from "../Commands";
import Listener from "../Interfaces/Listener";

class Ready implements Listener {
	onBotEvent(bot: Bot): void {
		bot.authed = true;
		console.log("Loaded metadata. Joining voice channel...");

		bot.client.joinVoiceChannel(bot.config.defaultVoiceChannel, (error, connection) => {
			if (error){
				console.error("An error occurred connecting to the default voice channel");
				console.error(error);
			} else {
				console.log("Joined. Resetting the status message...");

				bot.client.setPlayingGame(undefined, (error) => {
					bot.ready = true;
					console.log("Ready and listening for commands.");
				});
			}
		});
	}
}

export default Ready;
