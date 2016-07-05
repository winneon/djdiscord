"use strict";

function Queue(bot){
	if (!(this instanceof Queue)){
		return new Queue(bot);
	}

	this.bot = bot;

	this.usage = "%cmd%"
	this.description = "List all of the items in the queue, in order."
	this.argCount = 0;

	this.staff = false;
}

Queue.prototype.runCommand = function(message, args){
	this.bot.sendMessage(message.channel, {
		message: "Successfully went through the command API!",
		mention: message.author
	});
}

module.exports = Queue;
