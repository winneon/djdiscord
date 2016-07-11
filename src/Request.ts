"use strict";

class Request {
	title: string;
	link: string;
	requester: string;
	duration: number;

	constructor(options: { title: string, link: string, requester: string, duration: number }){
		this.title = options.title;
		this.link = options.link;
		this.requester = options.requester;
		this.duration = options.duration;
	}

	get durationAsString(){
		// Credit to http://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript#comment57297644_25279340.
		return new Date(this.duration * 1000).toISOString().substr(11, 8);
	}
}

export default Request;
