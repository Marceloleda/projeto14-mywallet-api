import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { registrationCollection, sessionsCollection, usersCollection } from "../database/db.js";

export async function nova_entrada(req, res){
    const { descricao} = req.body;
    const valo = parseInt(req.body.valor)
    const valor = valo.toLocaleString('pt-BR', { minimumFractionDigits: 2});
    console.log(valor)
    const token = req.headers.authorization?.replace('Bearer ', '');
    const data = dayjs().format('DD/MM')
  
    try{
        const session = await sessionsCollection.findOne({token})
        const sequence = await registrationCollection.findOneAndUpdate(
            { token: token },
            { $inc: { value: 1 } },
        );
        await registrationCollection.updateOne(
            {token: token},
            {$push: 
                {entrada: {id: sequence.value.value,data: data, valor, descricao, tipo: "positivo"}}}
        )
        const usuario = await usersCollection.findOne({_id: ObjectId(session.userId)});
        const valorInt = parseInt(req.body.valor)
        await usersCollection.updateOne(
			{_id: ObjectId(session.userId)}, 
			{$set: {saldo: usuario.saldo + valorInt}}
		);

        res.sendStatus(200)
    }
    catch(error){
        return res.send(error.message)
    }
}