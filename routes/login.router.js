import { Router } from "express";
import {login} from "../controllers/login.controller.js"
import {validateLogin} from "../middlewares/validateLogin.middleware.js"

const router = Router()

router.post("/", validateLogin,login)

export default router