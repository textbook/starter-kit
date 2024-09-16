import mongoose from "mongoose";

import logger from "./utils/logger.js";

mongoose.connection.on("error", (err) => logger.error("%O", err));
mongoose.set("debug", (collection, method, query, doc) => {
	logger.debug("%O", { collection, method, query, doc });
});

/**
 * @param {string} uri
 * @param {import("mongoose").ConnectOptions} [options]
 */
export const connectDb = async (uri, options) => {
	const client = await mongoose.connect(uri, {
		bufferCommands: false,
		...options,
	});
	logger.info("connected to %s", client.connection.name);
};

export const disconnectDb = async () => {
	await mongoose.disconnect();
};

export const testConnection = async () => {
	const state = mongoose.connection.readyState;
	if (state !== mongoose.ConnectionStates.connected) {
		throw new Error(`database connection state: ${mongoose.STATES[state]}`);
	}
};
