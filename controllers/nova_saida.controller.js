import { registrationCollection } from "../database/db.js";

export async function nova_saida(req, res){
    const {valor, descricao} = req.body;
    const token = req.headers.authorization?.replace('Bearer ', '');
  
    try{
        const registro = await registrationCollection.findOne({token})

        const sequence = await registrationCollection.findOneAndUpdate(
            { token: token },
            { $inc: { value: 1 } },
        );
        await registrationCollection.updateOne(
            {token: token},
            {$push: 
                {saida: {id: sequence.value.value, valor, descricao}}}
        )

        res.sendStatus(200)
    }
    catch(error){
        return res.send(error.message)
    }
}