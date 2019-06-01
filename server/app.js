import express from "express";
import path from "path";

const app = express();

app.get("/api", (_, res) => {
  res.json({ message: "Hello, world!" });
});

app.use(express.static(path.join(__dirname, "static")));

export default app;
