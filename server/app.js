import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";

const application = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

application.use(express.static(join(__dirname, "static")));

export default application;
