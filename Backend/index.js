const express=require("express");
<<<<<<< HEAD
const bodyParser = require('body-parser');

const app=express();
require("dotenv").config();

const {connection}= require("./Configs/db");
const {authenticator}=require("./Middlewares/authenticator");
const {userRouter}=require("./Routes/user.route");
const {qrRouter}=require("./Routes/qr.route")
=======

require("dotenv").config();

const {connection}= require("./Configs/db");
>>>>>>> 9cdd39253badfa48256e6378119cf7506f98277f

const {userRouter}=require("./Routes/user.route")
const {oauthRouter}=require("./Routes/oauthrouter")
const cors = require('cors')



const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.json());

<<<<<<< HEAD
app.use("/user",userRouter);
app.use(qrRouter)

app.use(authenticator);
=======
app.use(cors())
app.use("/user",userRouter)
app.use("/oauth",oauthRouter)
>>>>>>> 9cdd39253badfa48256e6378119cf7506f98277f




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is listning at port ${process.env.port}`)
})
