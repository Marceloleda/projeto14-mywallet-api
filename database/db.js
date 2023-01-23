import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL)

try{
    await mongoClient.connect();
    console.log("Projeto conectado ao banco de dados");
}catch (error) {
    console.log(error);
}
  
const db = mongoClient.db("wallet");
export const usersCollection = db.collection("users")
export const sessionsCollection = db.collection("sessions")