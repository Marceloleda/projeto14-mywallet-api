import joi from "joi";
  
export const cadastroSChema = joi.object({
    nome: joi.string().min(3).required(),
    email: joi.string().email().required(),
    senha: joi.string().min(4).required(),
    confirmeSenha: joi.ref('senha')
})