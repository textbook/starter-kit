import { Router } from "express";

const api = Router();

api.get("/message", (_, res) => {
	res.send("Hello, world!");
});

export default api;
