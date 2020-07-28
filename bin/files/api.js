
import { Router } from "express";

import { getClient } from "./db";

const router = new Router();

router.get("/", (_, res, next) => {
	const client = getClient();

	client.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
		client.close();
	});
});

export default router;
