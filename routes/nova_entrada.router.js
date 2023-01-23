import { Router } from "express";
import { nova_entrada } from "../controllers/nova_entrada.controller.js";
import { validateEntrada_Saida } from "../middlewares/validateEntrada_Saida.middleware.js";
import { validateToken } from "../middlewares/validateToken.middleware.js";
const router = Router()

router.post("/nova-entrada", validateToken,validateEntrada_Saida, nova_entrada)

export default router