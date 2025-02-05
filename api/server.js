import createApp from "./app.js";
import { connectDb } from "./db.js";
import config from "./utils/config.cjs";
import logger from "./utils/logger.js";

const { port } = config.init();

await connectDb();

const app = await createApp();

app.listen(port, () => logger.info(`listening on ${port}`));
