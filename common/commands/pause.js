"use strict";

function Pause(bot){
	if (!(this instanceof Pause)){
		return new Pause(bot);
	}

	this.bot = bot;

	this.usage = "%cmd%"
	this.description = "Pause the currently playing song."
	this.argCount = 0;

	this.staff = true;
}

Pause.prototype.runCommand = function(message, args){
	this.bot.sendMessage(message.channel, {
		message: "Successfully went through the command API!",
		mention: message.author
	});
}

module.exports = Pause;
