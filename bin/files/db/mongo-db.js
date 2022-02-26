import mongoose from "mongoose";

import config from "./config";

const configuration = {
	serverSelectionTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

export const connectDb = async () => {
	try {
		await mongoose.connect(config.dbUrl, configuration);
		console.log("MongoDB connected to", mongoose.connection.name);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export const disconnectDb = async () => {
	if (mongoose.connection) {
		await mongoose.connection.close();
	}
};
