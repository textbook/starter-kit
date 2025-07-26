/* eslint-disable n/no-unsupported-features/node-builtins -- requires Node 22 */
const SERVICE_NAME = "starter-kit";

const [
	{
		owner: { id: ownerId },
	},
] = await safeFetch("/owners");
const [
	{
		project: { id: projectId },
	},
] = await safeFetch("/projects", { query: { name: SERVICE_NAME } });
const [
	{
		service: { id: serviceId },
	},
] = await safeFetch("/services", { query: { name: SERVICE_NAME } });
const [
	{
		environment: { id: environmentId },
	},
] = await safeFetch("/environments", { query: { projectId } });

const databases = await safeFetch("/postgres", {
	query: { name: SERVICE_NAME },
});

if (databases.length === 1) {
	const {
		postgres: { id: oldId },
	} = databases[0];
	console.debug("deleting database %s", oldId);
	await safeFetch(`/postgres/${oldId}`, { method: "DELETE" });
}

const { id: newId } = await safeFetch("/postgres", {
	body: {
		environmentId,
		name: SERVICE_NAME,
		ownerId,
		plan: "free",
		region: "frankfurt",
		version: "16",
	},
	method: "POST",
});

console.info(`waiting for ${newId} to become available`);
while (true) {
	await wait(5_000);
	const { status } = await safeFetch(`/postgres/${newId}`);
	if (status === "available") {
		break;
	}
}

console.debug("updating DATABASE_URL env var");
const { internalConnectionString } = await safeFetch(
	`/postgres/${newId}/connection-info`,
);
await safeFetch(`/services/${serviceId}/env-vars`, {
	body: [
		{ key: "DATABASE_URL", value: internalConnectionString },
		{ key: "LOG_LEVEL", value: "info" },
		{ key: "NODE_ENV", value: "production" },
	],
	method: "PUT",
});

console.debug("triggering redeploy of %s", serviceId);
const { id: deployId } = await safeFetch(`/services/${serviceId}/deploys`, {
	body: {},
	method: "POST",
});
while (true) {
	await wait(5_000);
	const { status } = await safeFetch(
		`/services/${serviceId}/deploys/${deployId}`,
	);
	if (status === "live") {
		break;
	}
}

/**
 * @param {string} path
 * @param {any=} body
 * @param {string=} method
 * @param {Record<string, string>=} query
 * @return {Promise<any>}
 */
async function safeFetch(
	path,
	{ body = null, method = "GET", query = {} } = {},
) {
	/** @type {RequestInit} */
	const requestConfig = {
		body: body === null ? undefined : JSON.stringify(body),
		headers: new Headers({
			Authorization: `Bearer ${process.env.API_TOKEN}`,
			Accept: "application/json",
		}),
		method,
	};
	if (body !== null) {
		requestConfig.body = JSON.stringify(body);
		requestConfig.headers.set("Content-Type", "application/json");
	}
	const url = new URL("https://api.render.com/v1");
	url.pathname += path;
	Object.entries(query).forEach(([key, value]) =>
		url.searchParams.append(key, value),
	);
	const res = await fetch(url, requestConfig);
	if (!res.ok) {
		throw new Error(`${res.status}: ${res.statusText}`);
	}
	if (res.status === 204) {
		return null;
	}
	let response;
	try {
		response = await res.json();
	} catch (err) {
		console.error(await res.text());
		throw err;
	}
	return response;
}

/**
 * @param {number} ms
 * @return {Promise<void>}
 */
async function wait(ms) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}
