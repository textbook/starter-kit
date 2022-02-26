export default {
	dbUrl: process.env.MONGODB_URI ?? "mongodb://localhost:27017/cyf",
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
};
