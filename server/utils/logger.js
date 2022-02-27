import { createLogger, format, transports } from "winston";

import config from "./config";

const logger = createLogger({
	format: format.combine(
		format.align(),
		format.colorize(),
		format.errors({ stack: true }),
		format.splat(),
		format.simple(),
	),
	level: config.logLevel,
	transports: [
		new transports.Console(),
	],
});

if (!config.production) {
	logger.debug("configured with: %O", config);
}

export default logger;
