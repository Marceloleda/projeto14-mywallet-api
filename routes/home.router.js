import { Router } from "express";
import { home } from "../controllers/home.controller.js";
import { validateHome } from "../middlewares/validateHome.middleware.js";

const router = Router();

router.get("/home", validateHome ,home)

export default router