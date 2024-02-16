import { useEffect, useState } from "react";

import { getMessage } from "../services/messageService.js";

export default function ServerStatus() {
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState();

	useEffect(() => {
		setLoading(true);
		getMessage()
			.then(setState)
			.catch((err) => console.error(err.message))
			.finally(() => setLoading(false));
	}, []);

	return loading ? null : <div>Server says: {state ?? "unknown"}</div>;
}
