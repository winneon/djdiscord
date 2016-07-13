"use strict";

class Utils {
	static stripID(id: string): string {
		return id.replace(/\D/g, "");
	}

	static secondsAsString(secs: number): string {
		return Number.isNaN(secs) ? "NaN" : new Date(secs * 1000).toISOString().substr(11, 8);
	}
}

export default Utils;
