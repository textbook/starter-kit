export function getErrorMessage(err: unknown): string {
	if (
		typeof err === "object" &&
		err !== null &&
		"message" in err &&
		typeof err.message === "string"
	) {
		return err.message;
	}
	return "<unknown>";
}
