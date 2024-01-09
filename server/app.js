import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import morgan from "morgan";

const application = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

application.use(morgan("dev"));

application.get("/healthz", (_, res) => res.sendStatus(200));

application.use(express.static(join(__dirname, "static")));

export default application;
