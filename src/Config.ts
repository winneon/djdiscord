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
		try {
			let config: any = require("../config.json");

			this.commandPrefix = config.command_prefix;
			this.token = config.token;
			this.staffRole = config.staff_role;

			this.linked = {
				text: undefined,
				voice: undefined
			};
		} catch (e){
			console.error("The provided config is invalid. Please create a proper config from the example.");
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
