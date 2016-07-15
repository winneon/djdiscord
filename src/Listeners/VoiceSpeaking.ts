"use strict";

// Local TS Imports
import Bot from "../Bot";
import Listener from "../Interfaces/Listener";

class VoiceSpeaking implements Listener {
	onBotEvent(bot: any, channel: any, user: any): void {
		let voice: any = bot.client.voiceConnection;

		if (voice.voiceChannel.id === channel.id && bot.client.user.id !== user.id){
			voice.setVolume(user.speaking ? 0.1 : 1.0);
		}
	}
}

export default VoiceSpeaking;
