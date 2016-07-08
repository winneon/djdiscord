"use strict";

class Config {
	commandPrefix: string;
	defaultVoiceChannel: string;
	token: string;

	constructor(){
		let config: any = require("../config.json");

		try {
			this.commandPrefix = config.command_prefix;
			this.defaultVoiceChannel = config.default_voice_channel
			this.token = config.token;
		} catch (e){
			console.error("The provided config is invalid. Please create a proper config from the example.");
			process.exit(1);
		}
	}
}

export default Config;
