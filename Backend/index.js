const express=require("express");
require("dotenv").config();

const {connection}= require("./Configs/db");

const {userRouter}=require("./Routes/user.route")
const {oauthRouter}=require("./Routes/oauthrouter")
const cors = require('cors')


const app=express();
app.use(express.json());

app.use("/user",userRouter)
app.use("/oauth",oauthRouter)
app.use(cors())




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is listning at port ${process.env.port}`)
})
