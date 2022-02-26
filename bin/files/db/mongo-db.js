import mongoose from "mongoose";

import config from "./config";
import logger from "./logger";

const configuration = {
	serverSelectionTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

export const connectDb = async () => {
	try {
		await mongoose.connect(config.dbUrl, configuration);
		logger.info("MongoDB connected to %s", mongoose.connection.name);
	} catch (err) {
		logger.error("%O", err);
		process.exit(1);
	}
};

export const disconnectDb = async () => {
	if (mongoose.connection) {
		await mongoose.connection.close();
	}
};
