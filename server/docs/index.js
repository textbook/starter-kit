import path from "path";

import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import {
	license,
	name as title,
	version,
} from "../../package.json";

const router = Router();

router.use("/", serve);

router.get("/", setup(swaggerJSDoc({
	apis: [
		path.join(__dirname, "*.yml"),
	],
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			license: {
				name: license,
			},
			title,
			version,
		},
	},
})));

export default router;
