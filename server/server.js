import app from "./app.js";

import config from "./utils/config.js";

const { port } = config;

app.listen(port, () => console.log(`listening on ${port}`));
