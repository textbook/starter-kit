const SERVICE_NAME = "starter-kit";

let status: string;

const [
	{
		owner: { id: ownerId },
	},
] = await safeFetch<{ owner: { id: string } }[]>("/owners");
const [
	{
		project: { id: projectId },
	},
] = await safeFetch<{ project: { id: string } }[]>("/projects", {
	query: { name: SERVICE_NAME },
});
const [
	{
		service: { id: serviceId },
	},
] = await safeFetch<{ service: { id: string } }[]>("/services", {
	query: { name: SERVICE_NAME },
});
const [
	{
		environment: { id: environmentId },
	},
] = await safeFetch<{ environment: { id: string } }[]>("/environments", {
	query: { projectId },
});

const databases = await safeFetch<{ postgres: { id: string } }[]>("/postgres", {
	query: { name: SERVICE_NAME },
});

if (databases.length === 1) {
	const {
		postgres: { id: oldId },
	} = databases[0];
	console.debug("deleting database %s", oldId);
	await safeFetch(`/postgres/${oldId}`, { method: "DELETE" });
}

const { id: newId } = await safeFetch<{ id: string }>("/postgres", {
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
status = "";
while (status !== "available") {
	await wait(5_000);
	({ status } = await safeFetch<{ status: string }>(`/postgres/${newId}`));
}

console.debug("updating DATABASE_URL env var");
const { internalConnectionString } = await safeFetch<{
	internalConnectionString: string;
}>(`/postgres/${newId}/connection-info`);
await safeFetch(`/services/${serviceId}/env-vars`, {
	body: [
		{ key: "DATABASE_URL", value: internalConnectionString },
		{ key: "LOG_LEVEL", value: "info" },
		{ key: "NODE_ENV", value: "production" },
	],
	method: "PUT",
});

console.debug("triggering redeploy of %s", serviceId);
const { id: deployId } = await safeFetch<{ id: string }>(
	`/services/${serviceId}/deploys`,
	{
		body: {},
		method: "POST",
	},
);
status = "";
while (status !== "live") {
	await wait(5_000);
	({ status } = await safeFetch<{ status: string }>(
		`/services/${serviceId}/deploys/${deployId}`,
	));
}

interface Opts {
	body?: unknown;
	method?: string;
	query?: Record<string, string>;
}

/** Make a request and return the (2xx) response body or throw an error. */
async function safeFetch<T = unknown>(
	path: string,
	{ body = null, method = "GET", query = {} }: Opts = {},
): Promise<T> {
	const requestConfig: RequestInit = {
		headers: new Headers({
			Authorization: `Bearer ${process.env.API_TOKEN as string}`,
			Accept: "application/json",
		}),
		method,
	};
	if (body !== null) {
		requestConfig.body = JSON.stringify(body);
		(requestConfig.headers as Headers).set("Content-Type", "application/json");
	}
	const url = new URL("https://api.render.com/v1");
	url.pathname += path;
	Object.entries(query).forEach(([key, value]) => {
		url.searchParams.append(key, value);
	});
	const res = await fetch(url, requestConfig);
	if (!res.ok) {
		throw new Error(`${res.status.toFixed(0)}: ${res.statusText}`);
	}
	if (res.status === 204) {
		return null as T;
	}
	try {
		return (await res.json()) as T;
	} catch (err) {
		console.error(await res.text());
		throw err;
	}
}

/** Return promise resolving after specified time (in ms). */
async function wait(ms: number): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, ms));
}
