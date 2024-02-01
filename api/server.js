import app from "./app.js";
import { connectDb } from "./db.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

const { port } = config;

await connectDb();

app.listen(port, () => logger.info(`listening on ${port}`));
