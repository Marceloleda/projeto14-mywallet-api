import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRouter from "./routes/login.router.js"
import cadastroRouter from "./routes/cadastro.router.js"
import homeRouter from "./routes/home.router.js"
import nova_entrada from "./routes/nova_entrada.router.js"
import nova_saida from "./routes/nova_saida.router.js"

dotenv.config()
const api = express();
api.use(cors());
api.use(express.json())

api.use(loginRouter)
api.use(cadastroRouter)
api.use(homeRouter)
api.use(nova_entrada)
api.use(nova_saida)


const PORT = process.env.PORT || 5000;
api.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});