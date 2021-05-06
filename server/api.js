 import { Router } from "express";

const router = new Router();

 router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
}); 
router.get("/test", (_, res) => {
  res.json({ message: "I am working, guys!" });
}); 




export default router;
