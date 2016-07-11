"use strict";

// External Node Imports
let ytdl: any = require("youtube-dl");

// Local TS Imports
import Bot from "./Bot";
import Request from "./Request";

class Queue {
	bot: Bot;
	list: Request[];
	started: boolean;
	isPlaying: boolean;

	constructor(bot: Bot){
		this.bot = bot;
		this.list = [ ];
		this.started = false;
		this.isPlaying = false;
	}

	get currentlyPlaying(){
		return this.list.length > 0 ? this.list[0] : undefined;
	}

	addRequest(link: string, user: any, callback?: (error: any, request: any, position: any) => void): void {
		let url: boolean = false;

		if (require("valid-url").isUri(link)){
			url = true;
		} else {
			link = "gvsearch1:" + link;
		}

		ytdl.getInfo(link, (error, info) => {
			if (error){
				if (error.message.indexOf("ERROR: Unsupported URL") > -1){
					if (callback) callback("invalid", undefined, undefined);
				} else {
					if (callback) callback(error.message, undefined, undefined);
				}
			} else {
				// Credit to http://stackoverflow.com/a/9640417.
				let split: string[] = info.duration.split(":");
				let sec: number = 0;
				let min: number = 1;

				while (split.length > 0){
					sec += min * parseInt(split.pop(), 10);
					min *= 60;
				}

				let request: Request = new Request({
					title: info.fulltitle,
					link: url ? link : "https://www.youtube.com/watch?v=" + info.id,
					requester: user.id ? user.id : user,
					duration: sec
				});

				this.list.push(request);
				this._checkQueue();

				if (callback) callback(undefined, request, this.list.length);
			}
		});
	}

	remRequest(position, callback?: (error: any, request: Request) => void): void {
		if (this.list.length >= position + 1){
			let voice: any = this.bot.client.voiceConnection;
			let cont: boolean = false;
			let request: Request = this.list[position];

			if (position === 0 && this.started){
				this.bot.client.setPlayingGame(null, (error) => {
					if (error){
						console.error("An error occurred resetting the song status on remove.");
						console.error(error);
					}
				});

				voice.stopPlaying();

				this.started = false;
				this.isPlaying = false;

				cont = true;
			}

			this.list.splice(position, 1);

			if (cont){
				this._checkQueue();
			}

			if (callback) callback(undefined, request);
		} else {
			if (callback) callback("nothing playing", undefined);
		}
	}

	_checkQueue(): void {
		if (!this.isPlaying && !this.bot.client.voiceConnection.playing && this.list.length > 0){
			this._queryQueue(this.currentlyPlaying);
		}
	}

	_queryQueue(request: any): void {
		console.log(this.list[0]);

		this.isPlaying = true;
		let stream: any = ytdl(request.link, [ "--format=bestaudio[abr<=192]/best" ]);

		stream.on("info", (info, format) => {
			this.bot.client.setPlayingGame(info.title);

			this.bot.sendMessage(this.bot.config.linked.text, {
				message: "Now playing `" + request.title + "`."
			});
		});

		stream.on("error", (error) => {
			this.bot.sendMessage(this.bot.config.linked.text, {
				message: "```\n" + error.message + "\n```"
			});

			this.remRequest(0);
		});

		this.bot.client.startTyping(this.bot.config.linked.text);

		this.bot.client.voiceConnection.playRawStream(stream, (error, intent) => {
			if (error){
				console.error("An error occurred playing a stream.")
				console.error(error);
			} else {
				this.started = true;

				intent.on("end", () => {
					this.remRequest(0);
				});
			}
		});
	}
}

export default Queue;
