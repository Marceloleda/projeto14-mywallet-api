import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from 'bcrypt';

export async function login(req, res, next){
    const {email, senha} = req.body;
    const user = await usersCollection.findOne({email})
    
    try{
        const isValid = bcrypt.compareSync(senha, user.hashSenha)
        if(isValid){
            const session = await sessionsCollection.findOne({userId: user._id})
            res.status(200).send(session.token)
            return
        }

        res.sendStatus(200)
    }catch(error){
        return res.status(500).send("Verifique seus dados e tente novamente")
    }
}