"use strict";

var discord = require("discord.js"),
    path    = require("path"),
    fs      = require("fs");

var config = require("./config");

function Bot(){
	this.authed = false;

	this.bot = new discord.Client({
		rateLimitAsError: true,
		autoReconnect: true
	});

	this.bot.on("ready", () => {
		console.log("Loaded all metadata. Loading commands...");
		this.authed = true;

		var commands = require("./commands")(this);
		var dir = fs.readdirSync(path.join(__dirname, "commands"));

		for (var i = 0; i < dir.length; i++){
			var command = dir[i].split(".");

			command.pop();
			command = command.join(".");

			commands.registerCommand(command);
		}

		console.log("Loaded all commands. Ready.");
	})

	console.log("Attempting to login...");

	this.bot.loginWithToken(config.token, (error, token) => {
		if (error){
			console.error("An error occurred logging in to the bot.");
			console.error(error);

			process.exit(1);
		} else {
			console.log(`Successfully logged in as ${bot.user.username}. Loading metadata...`);
		}
	});
};

Bot.prototype.getDiscord = function(){
	return discord;
};

Bot.prototype.getBot = function(){
	if (this.authed){
		return this.bot;
	}

	return undefined;
};

Bot.prototype.getServer = function(){
	var servers = this.bot.servers;

	for (var i = 0; i < servers.length; i++){
		var server = servers[i];

		if (server.id === config.server_id){
			return server;
		}
	}

	console.error("The bot is not connected to the provided server_id in the config.");
	process.exit(1);

	return undefined;
};

Bot.prototype.sendMessage = function(channel, content, options, callback){
	if (content.mention){
		var user = content.mention;

		if (content.mention instanceof Number){
			user = this.getUserByID(content.mention);
		}

		if (user instanceof Object){
			content.message = user.mention() + " " + content.message;
		}
	}

	this.bot.sendMessage(channel, content.message, content.options, function(error){
		if (error){
			console.error("An error occurred sending a message.");
			console.error(error);
		} else if (callback){
			callback();
		}
	});
};

// the below functions only exist because they're not in the discord.js api for some reason

Bot.prototype.getChannelByID = function(id){
	var channels = this.getServer().channels;

	for (var i = 0; i < channels.length; i++){
		var channel = channels[i];

		if (channel.id === id){
			return channel;
		}
	}

	return undefined;
};

Bot.prototype.getChannelByName = function(name, type){
	var channels = this.getServer().channels;
	var channelType = type || "text";

	for (var i = 0; i < channels.length; i++){
		var channel = channels[i];

		if (channel.type === channelType && channel.name.toLowerCase() === name.toLowerCase()){
			return channel;
		}
	}

	return undefined;
};

Bot.prototype.getRoleByID = function(id){
	var roles = this.getServer().roles;

	for (var i = 0; i < roles.length; i++){
		var role = roles[i];

		if (role.id === id){
			return role;
		}
	}

	return undefined;
};

Bot.prototype.getRoleByName = function(name){
	var roles = this.getServer().roles;

	for (var i = 0; i < roles.length; i++){
		var role = roles[i];

		if (role.name.toLowerCase() === name.toLowerCase()){
			return role;
		}
	}

	return undefined;
};

Bot.prototype.getUserByID = function(id){
	var users = this.getServer().members;

	for (var i = 0; i < users.length; i++){
		var user = users[i];

		if (user.id === id){
			return user;
		}
	}

	return undefined;
};

Bot.prototype.stripID = function(id){
	return id.replace(/\D/g, "");
};

module.exports = new Bot();
