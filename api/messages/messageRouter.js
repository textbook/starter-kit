import { Router } from "express";

import { asyncHandler } from "../utils/middleware.js";

import { getMessage } from "./messageService.js";

const router = Router();

router.get(
	"/",
	asyncHandler(async (_, res) => {
		res.send(await getMessage());
	}),
);

export default router;
