"use strict";

// Local TS Imports
import Bot from "../Bot";

interface Listener {
	onBotEvent(bot: Bot, ...args: any[]): void;
}

export default Listener;
