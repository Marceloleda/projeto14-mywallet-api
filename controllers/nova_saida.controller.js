import dayjs from "dayjs";
import { registrationCollection, usersCollection, sessionsCollection } from "../database/db.js";

export async function nova_saida(req, res){
    const {valor, descricao} = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
    const data = dayjs().format('DD/MM')

  
    try{
        const session = await sessionsCollection.findOne(token)
        const sequence = await registrationCollection.findOneAndUpdate(
            { token: token },
            { $inc: { value: 1 } },
        );
        await registrationCollection.updateOne(
            {token: token},
            {$push: 
                {entrada: {id: sequence.value.value,data: data, valor, descricao, tipo: "negativo"}}}
        )
        const usuario = await usersCollection.findOne({_id: session.userId});

        await usersCollection.updateOne(
			{_id: session.userId}, 
			{$set: {saldo: usuario.saldo - valor}}
		);
    }
    catch(error){
        return res.send(error.message)
    }
}