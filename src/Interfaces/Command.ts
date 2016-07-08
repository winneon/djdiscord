"use strict";

// Local TS Imports
import Bot from "../Bot";

interface Command {
	usage: string;
	description: string;
	args: number;
	staff: boolean;

	onCommand(bot: Bot, message: any, args: string[]): void;
}

export default Command;
