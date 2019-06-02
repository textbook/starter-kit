import express from "express";
import morgan from "morgan";
import path from "path";

const app = express();

app.use(morgan("dev"));

app.get("/api", (_, res) => {
  res.json({ message: "Hello, world!" });
});

app.use(express.static(path.join(__dirname, "static")));

export default app;
