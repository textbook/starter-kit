// eslint-disable-next-line n/no-extraneous-import -- installed with Winston
import { MESSAGE } from "triple-beam";
import { createLogger, format, transports } from "winston";

import config from "./config.cjs";

/** @type {import("winston").Logger} */
const logger = new Proxy(
	{ logger: undefined },
	{
		get(target, prop) {
			if (target.logger === undefined) {
				target.logger = buildLogger();
				if (!config.production) {
					target.logger.debug("configured with: %O", config);
				}
			}
			return target.logger[prop];
		},
	},
);

/**
 * @returns {import("winston").Logger}
 */
function buildLogger() {
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
			format.colorize(),
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
