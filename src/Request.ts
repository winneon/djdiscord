"use strict";

// Local TS Imports
import Utils from "./Utils";

class Request {
	title: string;
	link: string;
	requester: string;
	duration: number;

	shortTitle: string;

	constructor(options: { title: string, link: string, requester: string, duration: number, shortTitle?: string }){
		this.title = options.title;
		this.link = options.link;
		this.requester = options.requester;
		this.duration = options.duration;

		if (options.shortTitle) this.shortTitle = options.shortTitle;
	}

	get durationAsString(){
		// Credit to http://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript#comment57297644_25279340.
		return Utils.secondsAsString(this.duration);
	}
}

export default Request;
