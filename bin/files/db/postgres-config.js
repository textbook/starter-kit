export default {
	dbUrl: process.env.DATABASE_URL ?? "postgres://localhost:5432/cyf",
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV === "production",
};
