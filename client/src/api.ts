import axios from "axios";

const client = axios.create({ baseURL: "/api" });

export const get = client.get;
