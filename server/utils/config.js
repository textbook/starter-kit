import "dotenv/config";

export default {
	logLevel: process.env.LOG_LEVEL?.toLowerCase() ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV?.toLowerCase() === "production",
};
