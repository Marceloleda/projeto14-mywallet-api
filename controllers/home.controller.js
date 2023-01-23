import { sessionsCollection, usersCollection, registrationCollection } from "../database/db.js";

export async function home(req, res){
    const token = req.headers.authorization?.replace('Bearer ', '');

    try{
        const session = await sessionsCollection.findOne({token})
        const user = await usersCollection.findOne({_id: session.userId})

        const registro = await registrationCollection.findOne({token})

        delete user.hashSenha
        delete registro.token
        res.send({user, registro})
    }
    catch(error){
        return res.send(error.message)
    }
}