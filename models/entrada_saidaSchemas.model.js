import joi from "joi";

export const entrada_saidaSchema = joi.object({
    valor: joi.number().required(),
    descricao: joi.string().required()
})