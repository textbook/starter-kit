import config from "./utils/config.ts";

const { port } = config.init();

const { start } = await import("./app.ts");

start(port);
