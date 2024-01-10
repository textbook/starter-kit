import app from "./app.js";

import config from "./utils/config.js";
import logger from "./utils/logger.js";

const { port } = config;

app.listen(port, () => logger.info(`listening on ${port}`));
