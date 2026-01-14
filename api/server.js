import config from "./utils/config.js";

const { port } = config.init();

const { start } = await import("./app.js");

start(port);
