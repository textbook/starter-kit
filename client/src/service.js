import { get } from "./api";

export const getMessage = async () => {
	const response = await get("/");
	return response.data.message;
};
