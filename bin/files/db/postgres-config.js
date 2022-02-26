export default {
	dbUrl: process.env.DATABASE_URL ?? "postgres://localhost:5432/cyf",
	port: parseInt(process.env.PORT ?? "3000", 10),
};
