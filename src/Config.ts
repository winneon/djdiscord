"use strict";

// Native Node Imports
let path: any = require("path");
let fs: any = require("fs");

class Config {
	commandPrefix: string;
	token: string;
	staffRole: string;

	linked: {
		text: string,
		voice: string
	};

	constructor(){
		let config: any = undefined;

		try {
			config = require("../config.json");

			this.linked = {
				text: undefined,
				voice: undefined
			};
		} catch (e){
			if (!(process.env.DJ_COMMAND_PREFIX && process.env.DJ_TOKEN && process.env.DJ_STAFF_ROLE)){
				console.error("The provided config is invalid. Please create a proper config from the example.");
				process.exit(1);
			}
		}

		if (config){
			this.commandPrefix = config.command_prefix || process.env.DJ_COMMAND_PREFIX;
			this.token = config.token || process.env.DJ_TOKEN;
			this.staffRole = config.staff_role || process.env.DJ_STAFF_ROLE;
		} else {
			console.error("The config was not oaded properly. You probably did something bad.");
			process.exit(1);
		}

		let file: string = path.join(__dirname, "..", "linked.json");

		if (!fs.existsSync(file)){
			fs.writeFileSync(file, JSON.stringify({ }, null, "\t"));
		}

		try {
			let defs: any = require(file);

			this.linked.text = defs.text || undefined;
			this.linked.voice = defs.voice || undefined;
		} catch (e){
			console.error("The linked.json file is invalid. Please delete it before continuing.");
			console.error(e);
			process.exit(1);
		}
	}

	saveLinked(): void {
		fs.writeFileSync(path.join(__dirname, "..", "linked.json"), JSON.stringify(this.linked, null, "\t"));
	}
}

export default Config;
