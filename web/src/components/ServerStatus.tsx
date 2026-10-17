import { useEffect, useState } from "react";

import { getMessage } from "../services/messageService.ts";
import { getErrorMessage } from "../utilities.ts";

export default function ServerStatus() {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		setLoading(true);
		getMessage()
			.then(setMessage)
			.catch((err: unknown) => {
				console.error(getErrorMessage(err));
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return loading ? null : <div>Server says: {message ?? "unknown"}</div>;
}
