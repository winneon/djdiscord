"use strict";

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
	this.bot.sendMessage(message.channel, {
		message: "Successfully went through the command API!",
		mention: message.author
	});
}

module.exports = Add;
