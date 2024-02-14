import { Router } from "express";

import messageRouter from "./messages/messageRouter.js";

const api = Router();

api.use("/message", messageRouter);

export default api;
