"use strict";

var ytdl = require("ytdl-core"),
    fs   = require("fs");

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
	/*var video = youtube_dl.exec(args[0], [ "--hls-prefer-ffmpeg", "-f", "bestaudio", "-o", "%(id)s.%(ext)s" ], (error, output) => {
		if (error){
			console.error("An error occured downloading a song.");
			console.error(error);
		} else {
			this.bot.getBot().stopTyping(message.channel);
			this.bot.sendMessage(message.channel, {
				message: "Finished!",
				mention: message.author
			});
		}
	});*/

	this.bot.sendMessage(message.channel, {
		message: "Finished!",
		mention: message.author
	});

	var stream = ytdl(args[0]);

	stream.on("info", (info, format) => {
		this.bot.getBot().setPlayingGame(info.title);
	});

	this.bot.getBot().voiceConnection.playRawStream(stream);
}

module.exports = Add;
