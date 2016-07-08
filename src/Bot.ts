"use strict";

// External Node Imports
let discord: any = require("discord.js");

// Native Node Imports
let path: any = require("path");
let fs: any = require("fs");

// Local TS Imports
import Config from "./Config";

class Bot {
	authed: boolean;
	ready: boolean;
	config: Config;
	discord: any;

	client: any;

	constructor(){
		this.authed = false;
		this.ready = false;
		this.config = new Config();
		this.discord = discord;

		this.client = new discord.Client({
			rateLimitAsError: true,
			autoReconnect: true
		});
	}

	login(token: string): void {
		console.log("Attempting to login...");

		this.client.loginWithToken(token, (error, token) => {
			if (error){
				console.error("An error occurred logging in to the bot.");
				console.error(error);

				process.exit(1);
			} else {
				this.authed = true;
				console.log("Successfully logged in.");
			}
		});
	}

	sendMessage(channel: any, content: { message: string, mention?: any; options?: any }, callback?: () => void): void {
		if (content.mention){
			if (typeof content.mention === "string"){
				content.mention = this.client.users.get("id", content.mention);
			}

			if (typeof content.mention === "object"){
				content.message = content.mention.mention() + " " + content.message;
			}
		}

		this.client.stopTyping(channel);
		this.client.sendMessage(channel, content.message, content.options, function(error){
			if (error){
				console.error("An error occurred sending a message.");
				console.error(error);
			} else if (callback){
				callback();
			}
		});
	}

	stripID(id: string): string {
		return id.replace(/\D/g, "");
	}
}

export default Bot;