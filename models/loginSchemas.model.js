import joi from "joi";

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required()
})