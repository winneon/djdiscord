"use strict";

function Veto(bot){
	if (!(this instanceof Veto)){
		return new Veto(bot);
	}

	this.bot = bot;

	this.usage = "%cmd%"
	this.description = "Veto or skip the currently playing song."
	this.argCount = 0;

	this.staff = true;
}

Veto.prototype.runCommand = function(message, args){
	this.bot.sendMessage(message.channel, {
		message: "Successfully went through the command API!",
		mention: message.author
	});
}

module.exports = Veto;
