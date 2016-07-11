"use strict";

// External Node Imports
let ytdl: any = require("youtube-dl");

// Local TS Imports
import Bot from "./Bot";
import Request from "./Request";

class Queue {
	bot: Bot;
	list: Request[];
	isPlaying: boolean;
	started: boolean;
	veto: boolean;

	constructor(bot: Bot){
		this.bot = bot;
		this.list = [ ];
		this.isPlaying = false;
		this.started = false;
		this.veto = false;
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
					duration: sec,
					shortTitle: info.title
				});

				if (this.list.length > 1 && this.list[this.list.length - 1].requester !== request.requester){
					let i: number = this.list.length - 1;

					while (true){
						if (this.list[i - 1] && this.list[i].requester === this.list[i - 1].requester){
							i--;
							continue;
						} else {
							this.list.splice(i + 1, 0, request);
							break;
						}
					}
				} else {
					this.list.push(request);
				}

				this._checkQueue();

				if (callback) callback(undefined, request, this.list.indexOf(request) + 1);
			}
		});
	}

	remRequest(position, callback?: (error: any, request: Request) => void): void {
		if (this.list.length >= position + 1){
			let voice: any = this.bot.client.voiceConnection;
			let cont: boolean = false;
			let request: Request = this.list[position];

			//console.log(this.list);

			if (position === 0 && this.isPlaying){
				this.bot.client.setPlayingGame(null, (error) => {
					if (error){
						console.error("An error occurred resetting the song status on remove.");
						console.error(error);
					}
				});

				this.veto = true;
				voice.stopPlaying();

				this.isPlaying = false;
				this.started = false;

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
		if (!this.started && !this.bot.client.voiceConnection.playing && this.list.length > 0){
			this._queryQueue(this.currentlyPlaying);
		}
	}

	_queryQueue(request: any): void {
		this.started = true;

		let loadMessage: any = undefined;
		let stream: any = ytdl(request.link, [ "--format=bestaudio[abr<=192]/best" ]);

		stream.on("info", (info, format) => {
			this.bot.client.setPlayingGame(info.title);

			if (loadMessage){
				this.bot.client.deleteMessage(loadMessage, (error) => {
					if (error){
						console.error("An error occurred deleting the loading message.")
						console.error(error);
					}
				});
			}

			this.bot.sendMessage(this.bot.config.linked.text, {
				message: "Now Playing: `" + request.title + "`."
			});
		});

		stream.on("error", (error) => {
			this.bot.sendMessage(this.bot.config.linked.text, {
				message: "```\n" + error.message + "\n```"
			});

			this.remRequest(0);
		});

		this.bot.sendMessage(this.bot.config.linked.text, {
			message: "Loading: `" + request.title + "`..."
		}, (message) => {
			loadMessage = message;
		});

		this.bot.client.voiceConnection.playRawStream(stream, (error, intent) => {
			if (error){
				console.error("An error occurred playing a stream.")
				console.error(error);
			} else {
				this.isPlaying = true;

				intent.on("end", () => {
					if (this.veto){
						this.veto = false;
					} else {
						this.remRequest(0);
					}
				});
			}
		});
	}
}

export default Queue;
