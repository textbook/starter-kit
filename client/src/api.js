import { create } from "axios";

const client = create({ baseURL: "/api" });

export const get = client.get;
