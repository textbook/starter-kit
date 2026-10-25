#!/usr/bin/env node
const headers = new Headers({ "Container-Healthcheck": "true" });
const method = "GET";
const port = process.env.PORT ?? "4000";
const url = `http://localhost:${port}/healthz`;

try {
	const res = await fetch(url, { headers, method });
	if (!res.ok) {
		throw new Error(res.statusText);
	}
} catch (err) {
	console.error("%O", err);
	process.exitCode = 1;
}
