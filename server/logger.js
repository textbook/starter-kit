import { createLogger, format, transports } from "winston";

import config from "./config";

export default createLogger({
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
