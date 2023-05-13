// ........................................Import .....................................

const express=require("express");
const bodyParser = require('body-parser');
require("dotenv").config();
// const { Server } = require("socket.io");
const http = require("http");
const cookieParser = require('cookie-parser')

// ........................................Import .....................................
const {connection}= require("./Configs/db");
const {authenticator}=require("./Middlewares/authenticator");
const {userRouter}=require("./Routes/user.route");
const {qrRouter}=require("./Routes/qr.route")
const {oauthRouter}=require("./Routes/oauthrouter")
const {fboauthRouter}=require("./Routes/fb-oauth-router")
const {adminRoute}=require("./Routes/adminRoutes")
const {logger}=require("./Middlewares/logger")


// .........................................App.........................................
const app=express();
// const httpServer = http.createServer(app);
// const io = new Server(httpServer);

const cors = require('cors')

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(express.json());

app.use(cors())
app.use(cookieParser());
app.use(logger)


// .........................................Route Setup.........................................
app.get("/",(req,res)=>{
    res.send("Server Home Page")
})
app.use("/user",userRouter)
app.use("/oauth",oauthRouter)

app.use("/fboauth",fboauthRouter)

app.get("/getdetails",(req,res)=>{
    const details=req.cookies.user
    res.json({user:details})
})

// app.use(authenticator);

app.use(qrRouter)
app.use("/admin",adminRoute)



// ///////.....................Socket................................

// const users = {};

// io.on("connection", (socket) => {
//   socket.on("send", (message) => {
//     socket.broadcast.emit("receive", {
//       message: message,
//       name: users[socket.id],
//     });
//   });


// socket.on("disconnect", (message) => {
//     socket.broadcast.emit("leave", users[socket.id])
//     delete users[socket.id];
//    });
//   });


// ...................................................Listen.......................................

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DataBase")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is listning at port ${process.env.port}`)
})
