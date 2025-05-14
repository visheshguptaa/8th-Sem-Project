import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongodb = process.env.mongodb;

function connectToDB(){
    mongoose.connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    try{
     console.log("database connected");
        

    }
    catch{
        console.log("something is wrong ");
    }
    
}


export {connectToDB};