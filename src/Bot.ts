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

		this.client.loginWithToken(token, (error, token) => {
			if (error){
				console.error("An error occurred logging in to the bot.");
				console.error(error);

				process.exit(1);
			} else {
				console.log("Successfully logged in.");
			}
		});
	}

	sendMessage(channel: any, content: { message: string, mention?: any; options?: any }, callback?: (message: any) => void): void {
		if (content.mention){
			if (typeof content.mention === "string"){
				content.mention = this.client.users.get("id", content.mention);
			}

			if (typeof content.mention === "object"){
				content.message = content.mention.mention() + " " + content.message;
			}
		}

		this.client.stopTyping(channel);
		this.client.sendMessage(channel, content.message, content.options, function(error, message){
			if (error){
				console.error("An error occurred sending a message.");
				console.error(error);
			} else if (callback){
				callback(message);
			}
		});
	}
}

export default Bot;
