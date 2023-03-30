const express=require("express");
const app=express();
require("dotenv").config();

const {connection}= require("./Configs/db");
const {authenticator}=require("./Middlewares/authenticator");
const {userRouter}=require("./Routes/user.route")



app.use(express.json());

app.use("/user",userRouter)
app.use(authenticator);




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is listning at port ${process.env.port}`)
})
