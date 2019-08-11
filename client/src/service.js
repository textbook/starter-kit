import axios from "axios";

export const getMessage = async () => {
	const response = await axios.get("/api");
	return response.data.message;
};
