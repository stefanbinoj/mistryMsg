import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection : ConnectionObject = {};

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to db ");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Connected  : "+db);
        connection.isConnected = db.connections[0].readyState ;
    }catch(error){
        console.log("An error ocured while connecting to db "+error)
        process.exit(1);
    }
}

export default dbConnect;