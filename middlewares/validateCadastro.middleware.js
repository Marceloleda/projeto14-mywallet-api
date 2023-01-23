import { cadastroSChema } from "../models/cadastroSchemas.model.js";
import { usersCollection } from "../database/db.js";

export async function validateCadastro(req, res, next){
    const {body} = req;
    const {email} =req.body
    const validation = cadastroSChema.validate(body, {abortEarly: false})
    const exist = await usersCollection.findOne({email})
    try{
        if(validation.error){
            const errors = validation.error.details.map((detail)=> detail.message);
            console.log(errors)
            res.sendStatus(422)
            return;
        }
        if(exist){
            res.status(409).send("email ja existe")
            return
        }

        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }
}