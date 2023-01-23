import { Router } from "express";
import { nova_saida } from "../controllers/nova_saida.controller.js";
import { validateEntrada_Saida } from "../middlewares/validateEntrada_Saida.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
const router = Router()

router.post("/nova-saida", validateToken,validateEntrada_Saida, nova_saida)

export default router