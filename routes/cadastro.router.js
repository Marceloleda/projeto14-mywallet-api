import { Router } from "express";
import { cadastro } from "../controllers/cadastro.controller.js";
import { validateCadastro } from "../middlewares/validateCadastro.middleware.js";

const router = Router()

router.post("/cadastro", validateCadastro, cadastro)

export default router