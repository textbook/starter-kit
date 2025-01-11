import { MESSAGE } from "triple-beam";
import { createLogger, format, transports } from "winston";

import config from "./config.cjs";

/** @type {import("logform").Format[]} */
const extraFormatters = config.timestamp
	? [
			format.timestamp({ format: config.timestampFormat }),
			format.printf((info) => `${info.timestamp} ${info[MESSAGE]}`),
		]
	: [];

const logger = createLogger({
	format: format.combine(
		format.align(),
		format.colorize(),
		format.errors({ stack: true }),
		format.splat(),
		format.simple(),
		...extraFormatters,
	),
	level: config.logLevel,
	transports: [new transports.Console()],
});

if (!config.production) {
	logger.debug("configured with: %O", config);
}

export default logger;
