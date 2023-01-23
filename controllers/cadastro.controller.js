import { usersCollection, sessionsCollection, registrationCollection } from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export async function cadastro(req, res, next){
    const {nome, email, senha} = req.body;
    const hashPassword = bcrypt.hashSync(senha, 10)
    const token = uuidv4();
    const entrada = []
    try{
        const user = await usersCollection.insertOne({
            nome,
            email,
            hashSenha: hashPassword,
            saldo: 0
        })
        if(user){
            await sessionsCollection.insertOne({
                token,
                userId: user.insertedId
            })
            await registrationCollection.insertOne({
                token,
                entrada
            })

        }
        res.status(201).send("sucesso")
    }catch(error){
        console.log(error.message)
        return res.status(500).send("Verifique seus dados e tente novamente")
    }
}