import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRouter from "./routes/login.router.js"
import cadastroRouter from "./routes/cadastro.router.js"
import homeRouter from "./routes/home.router.js"

dotenv.config()
const api = express();
api.use(cors());
api.use(express.json())

api.use(loginRouter)
api.use(cadastroRouter)
api.use(homeRouter)

const PORT = process.env.PORT || 5000;
api.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});