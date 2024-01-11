import { useEffect, useState } from "react";

export default function ServerStatus() {
	const [state, setState] = useState();

	useEffect(() => {
		fetch("/healthz")
			.then((res) => res.text())
			.then(setState)
			.catch((err) => setState(err.message));
	}, []);

	return <div>Server status: {state ?? "unknown"}</div>;
}
