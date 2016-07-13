"use strict";

// Local TS Imports
import Bot from "./Bot";

enum LoggerType {
	MESSAGE,
	ANNOUNCE,
	ERROR
}

class Logger {
	static bare(bot: Bot, message: string, channel?: string): Promise<any> {
		if (channel || bot.config.linked.text){
			bot.client.stopTyping(channel ? channel : bot.config.linked.text);
			return bot.client.sendMessage(channel ? channel : bot.config.linked.text, message)
				.catch(error => console.error(error));
		} else {
			return undefined;
		}
	}

	static message(bot: Bot, message: string, type: LoggerType = LoggerType.MESSAGE): Promise<any> {
		let emoji: string;

		switch (type){
			case LoggerType.MESSAGE:
			default:
				emoji = ":notepad_spiral:";
				break;
			case LoggerType.ANNOUNCE:
				emoji = ":notes:";
				break;
			case LoggerType.ERROR:
				emoji = ":no_entry_sign:";
				break;
		}

		return Logger.bare(bot, emoji + " | `" + LoggerType[type] + "` | " + message);
	}

	static announce(bot: Bot, message: string): Promise<any> {
		return Logger.message(bot, message, LoggerType.ANNOUNCE);
	}

	static error(bot: Bot, message: string, error?: Error): Promise<any> {
		if (error) console.error(error);
		return Logger.message(bot, message, LoggerType.ERROR);
	}
}

export default Logger;
