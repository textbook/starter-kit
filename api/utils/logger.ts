import type { Format } from "logform";
import { MESSAGE } from "triple-beam";
import type { Logger } from "winston";
import { createLogger, format, transports } from "winston";

import type { Config } from "./config.ts";
import { withConfig } from "./config.ts";

const logger = withConfig((config) => {
	const logger_ = buildLogger(config);
	if (!config.production) {
		logger_.debug("configured with: %O", config);
	}
	return logger_;
});

function buildLogger(config: Config): Logger {
	const extraFormatters: Format[] = config.timestamp
		? [
				format.timestamp({ format: config.timestampFormat }),
				format.printf(
					(info) => `${info.timestamp as string} ${info[MESSAGE] as string}`,
				),
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
