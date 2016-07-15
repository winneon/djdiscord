"use strict";

// Local TS Imports
import Bot from "../Bot";
import Logger from "../Logger";
import Command from "../Interfaces/Command";

class Mute implements Command {
	usage: string = "%cmd%";
	description: string = "Mute the dJ.";
	args: number = 0;
	staff: boolean = true;

	onCommand(bot: Bot, message: any, args: string[]): void {

	}
}

export default Mute;
