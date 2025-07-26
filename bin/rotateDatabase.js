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
] = await safeFetch(`/projects?name=${SERVICE_NAME}`);
const [
	{
		service: { id: serviceId },
	},
] = await safeFetch(`/services?name=${SERVICE_NAME}`);
const [
	{
		environment: { id: environmentId },
	},
] = await safeFetch(`/environments?projectId=${projectId}`);

const databases = await safeFetch(`/postgres?name=${SERVICE_NAME}`);

if (databases.length === 1) {
	const {
		postgres: { id: oldId },
	} = databases[0];
	console.debug(`deleting database ${oldId}`);
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

const { internalConnectionString } = await safeFetch(
	`/postgres/${newId}/connection-info`,
);

await safeFetch(`/services/${serviceId}/env-vars`, {
	body: [{ key: "DATABASE_URL", value: internalConnectionString }],
	method: "PUT",
});

await safeFetch(`/services/${serviceId}/deploys`, { body: {}, method: "POST" });

/**
 * @param {string} path
 * @param {Object=} body
 * @param {string=} method
 * @return {Promise<any>}
 */
async function safeFetch(path, { body = null, method = "GET" } = {}) {
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
	const res = await fetch(`https://api.render.com/v1${path}`, requestConfig);
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
