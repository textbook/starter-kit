import { createConnection } from "mongoose";

const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/cyf";

const configuration = {
	serverSelectionTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

let connection;

export const connectDb = async () => {
	try {
		connection = await createConnection(dbUrl, configuration);
		console.log("MongoDB connected to", connection.name);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export const disconnectDb = () => connection.close();

export default connection.db;
