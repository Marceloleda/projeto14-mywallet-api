import { sessionsCollection } from "../database/db.js";

export async function validateToken(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');
    const isValidToken = await sessionsCollection.findOne({token})
    
    try{
        if(!token){
            return res.sendStatus(401)
        }
        if(!isValidToken){
            return res.sendStatus(404)
        }

        next()
    }
    catch(error){
        res.sendStatus(422)
        return
    }
}