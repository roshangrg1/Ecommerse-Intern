import mongoose from 'mongoose'
import app from './app.js'
import config from "./config/index.js"


// create a fn
//  run a fn
// (async () =>{}) ()

(async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED");

        app.on('error', (err)=>  {
            console.log("Error: ", err);
            throw err;
        })

        const onListening = () =>{
            console.log(`Listening on ${config.PORT}`);
        }

        app.listen(config.PORT, onListening)

    } catch (error) {
        console.log("ERROR", error);
        throw error
    }
}) ()

