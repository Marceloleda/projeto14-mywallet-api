import { loginSchema } from "../models/loginSchemas.model.js";
import bcrypt from 'bcrypt';

export async function validateLogin(req, res, next){
    const {body} = req;
    const validation = loginSchema.validate(body, {abortEarly: false})
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