import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/db.js";   // also make sure you add `.js` here
import dotenv from "dotenv";
import {app} from './app.js'

dotenv.config({
    path: "./env"
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running at port:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongodb connection failed !!!",err)
})

























// function connectDB(){}

// connectDB()

// ;(async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_UTL}/${DB_NAME}`)
//         application.on("Error",()=>{
//             console.log("ERROR:", error)
//             throw error
//         })

//         application.listen(process.env.PORT,()=>{
//             console.log(`App is listening on port ${process.env.PORT} `);
//         })

//     }catch(error){
//         console.log('Error:',error)
//         throw err
//     }
// })


// ?second approach
