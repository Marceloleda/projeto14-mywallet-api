import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export async function cadastro(req, res, next){
    const {nome, email, senha} = req.body;
    const hashPassword = bcrypt.hashSync(senha, 10)
    const token = uuidv4();
    try{
        const user = await usersCollection.insertOne({
            nome,
            email,
            hashSenha: hashPassword
        })
        if(user){
            await sessionsCollection.insertOne({
                token,
                userId: user.insertedId
            })
        }
        res.status(201).send("sucesso")
    }catch(error){
        return res.status(500).send("Verifique seus dados e tente novamente")
    }
}