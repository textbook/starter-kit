export default {
	dbUrl: process.env.MONGODB_URI ?? "mongodb://localhost:27017/cyf",
	port: parseInt(process.env.PORT ?? "3000", 10),
};
