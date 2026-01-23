import { MESSAGE } from "triple-beam";
import { createLogger, format, transports } from "winston";

import { withConfig } from "./config.js";

const logger = withConfig((config) => {
	const logger_ = buildLogger(config);
	if (!config.production) {
		logger_.debug("configured with: %O", config);
	}
	return logger_;
});

/**
 * @param {import("./config.js").Config} config
 * @returns {import("winston").Logger}
 */
function buildLogger(config) {
	/** @type {import("logform").Format[]} */
	const extraFormatters = config.timestamp
		? [
				format.timestamp({ format: config.timestampFormat }),
				format.printf((info) => `${info.timestamp} ${info[MESSAGE]}`),
			]
		: [];

	return createLogger({
		format: format.combine(
			format.align(),
			format[config.colorize ? "colorize" : "uncolorize"](),
			format.errors({ stack: true }),
			format.splat(),
			format.simple(),
			...extraFormatters,
		),
		level: config.logLevel,
		transports: [new transports.Console()],
	});
}

export default logger;
