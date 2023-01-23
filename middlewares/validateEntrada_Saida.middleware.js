import { entrada_saidaSchema } from '../models/entrada_saidaSchemas.model.js';

export async function validateEntrada_Saida(req, res, next){
    const {body} = req;
    const validation = entrada_saidaSchema.validate(body, {abortEarly: false})
    try{
        if(validation.error){
            const errors = validation.error.details.map((detail)=> detail.message);
            console.log(errors)
            res.sendStatus(422)
            return;
        }
        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }
}