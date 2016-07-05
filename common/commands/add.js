"use strict";

var youtube_dl = require("youtube-dl"),
    fs         = require("fs");

function Add(bot){
	if (!(this instanceof Add)){
		return new Add(bot);
	}

	this.bot = bot;

	this.usage = "%cmd% <link>"
	this.description = "Add a song to the dJ queue."
	this.argCount = 1;

	this.staff = false;
}

Add.prototype.runCommand = function(message, args){
	this.bot.getBot().startTyping(message.channel);

	var video = youtube_dl.exec(args[0], [ "--hls-prefer-ffmpeg", "-f", "bestaudio", "-o", "%(id)s.%(ext)s" ], (error, output) => {
		if (error){
			console.error("An error occured downloading a song.");
			console.error(error);
		} else {
			this.bot.sendMessage(message.channel, {
				message: "Finished!",
				mention: message.author
			});
		}
	});
}

module.exports = Add;
