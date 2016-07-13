"use strict";

// External Node Imports
let ytdl: any = require("youtube-dl");

// Local TS Imports
import Bot from "./Bot";
import Logger from "./Logger";
import Request from "./Request";
import Utils from "./Utils";

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
		return this.list.length > 0 ? ("Now Playing: `" + (this.list[0].shortTitle ? this.list[0].shortTitle : this.list[0].title) + " [" + Utils.secondsAsString(parseInt((this.bot.client.voiceConnection.streamTime / 1000).toString())) + "/" + this.list[0].durationAsString + "]`.") : "There is nothing playing.";
	}

	addRequest(link: string, user: any): Promise<any> {
		let url: boolean = false;

		if (require("valid-url").isUri(link)){
			url = true;
		} else {
			link = "gvsearch1:" + link;
		}

		let that: Queue = this;

		return new Promise<any>((resolve, reject) => {
			ytdl.getInfo(link, (error, info) => {
				if (error){
					if (error.message.indexOf("ERROR: Unsupported URL") > -1){
						reject(new Error("Invalid URL."));
					} else {
						reject(error);
					}
				} else if (info.playlist){
					reject(new Error("Playlists not supported."));
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

					if (that.list.length > 1 && that.list[that.list.length - 1].requester !== request.requester){
						let i: number = that.list.length - 1;

						while (true){
							if (that.list[i - 1] && that.list[i].requester === that.list[i - 1].requester){
								i--;
								continue;
							} else {
								that.list.splice(i + 1, 0, request);
								break;
							}
						}
					} else {
						that.list.push(request);
					}

					resolve({
						request: request,
						position: that.list.indexOf(request) + 1
					});

					setTimeout(() => {
						that._checkQueue();
					}, 1000);
				}
			});
		});
	}

	remRequest(position): Promise<any> {
		if (this.list.length >= position + 1){
			let voice: any = this.bot.client.voiceConnection;
			let cont: boolean = false;
			let request: Request = this.list[position];

			//console.log(this.list);

			if (position === 0 && this.isPlaying){
				this.bot.client.setPlayingGame(null)
					.catch(error => console.error(error));

				this.veto = true;
				voice.stopPlaying();

				this.isPlaying = false;
				this.started = false;

				cont = true;

				setTimeout(() => {
					if (this.veto){
						this.veto = false;
					}
				}, 5000);
			}

			this.list.splice(position, 1);

			setTimeout(() => {
				if (cont){
					this._checkQueue();
				}
			}, 1000);

			return Promise.resolve(request);
		} else {
			return Promise.reject(new Error("There is nothing playing."));
		}
	}

	_checkQueue(): void {
		if (!this.started && !this.bot.client.voiceConnection.playing && this.list.length > 0){
			this._queryQueue(this.list[0]);
		}
	}

	_queryQueue(request: any): void {
		this.started = true;

		let loadMessage: any = undefined;
		let stream: any = ytdl(request.link, [ "--format=bestaudio[abr<=192]/best" ]);

		stream.on("info", (info, format) => {
			if (loadMessage){
				this.bot.client.deleteMessage(loadMessage)
					.catch(error => console.error(error));
			}

			Logger.announce(this.bot, "Now Playing: `" + request.title + "`.");

			this.bot.client.setPlayingGame(info.title)
				.catch(error => console.error(error));
		});

		stream.on("error", (error) => {
			Logger.error(this.bot, "Unknown Error:\n\n```" + error.message + "```", error);
			this.remRequest(0);
		});

		Logger.announce(this.bot, "Loading: `" + request.title + "`...")
			.then(message => loadMessage = message);

		this.bot.client.voiceConnection.playRawStream(stream)
			.then((intent) => {
				this.isPlaying = true;
				intent.on("error", error => console.error(error));

				intent.on("end", () => {
					if (this.veto){
						this.veto = false;
					} else {
						this.remRequest(0);
					}
				});
			})
			.catch(error => console.error(error));
	}
}

export default Queue;
