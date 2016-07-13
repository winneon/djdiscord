"use strict";

// External Node Imports
let discord: any = require("discord.js");

// Native Node Imports
let path: any = require("path");
let fs: any = require("fs");

// Local TS Imports
import Config from "./Config";

class Bot {
	config: Config;
	discord: any;

	client: any;

	constructor(){
		this.config = new Config();
		this.discord = discord;

		this.client = new discord.Client({
			rateLimitAsError: true,
			autoReconnect: true
		});
	}

	login(token: string): void {
		console.log("Attempting to login...");

		this.client.loginWithToken(token)
			.then(token => console.log("Successfully logged in."))
			.catch((error) => {
				console.error(error);
				process.exit(1);
			});
	}
}

export default Bot;
