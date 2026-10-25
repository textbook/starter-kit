import { Router } from "express";

import { getMessage } from "./messageService.ts";

const router = Router();

router.get("/", async (_, res) => {
	res.send(await getMessage());
});

export default router;
