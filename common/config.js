"use strict";

module.exports = (function(){
	var config = undefined;

	try {
		config = require("../config.json");
	} catch (error){
		console.error("The provided config.json is invalid. Please create a new config from the config example.");
		process.exit(1);
	}
	
	[ // configure required values in the config
		"command_prefix",
		"server_id",
		"token"
	].forEach((value) => {
		if (eval(`config["` + value.split(".").join(`"]["`) + `"]`) === undefined){
			console.error("The provided config is invalid. Please create a proper config from the example.");
			process.exit(1);
		}
	});

	return config;
})();
