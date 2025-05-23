import { connectDb } from "./db.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

const { port } = config.init();

await connectDb();

const { default: app } = await import("./app.js");

app.listen(port, () => logger.info(`listening on ${port}`));
