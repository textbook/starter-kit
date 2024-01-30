import app from "./app.js";
import { connect } from "./db.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";

const { port } = config;

await connect();

const server = app.listen(port);

server.on("listening", () => logger.info(`listening on ${port}`));
