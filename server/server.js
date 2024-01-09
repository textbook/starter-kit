import app from "./app.js";

const port = parseInt(process.env.PORT ?? "3000", 10);

app.listen(port, () => console.log(`listening on ${port}`));
