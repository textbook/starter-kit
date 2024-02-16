export async function getMessage() {
	const res = await fetch("/api/message");
	if (res.ok) {
		return res.text();
	}
	throw new Error(res.statusText);
}
