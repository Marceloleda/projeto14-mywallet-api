import { Router } from "express";
import { home } from "../controllers/home.controller.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/home", validateToken ,home)

export default router