import { get } from "./api";

export const getMessage = async (): Promise<string> => {
	const response = await get("/");
	return response.data.message;
};
