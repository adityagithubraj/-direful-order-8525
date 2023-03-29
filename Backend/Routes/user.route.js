const express=require("express");
const userRouter=express.Router();
const {authenticator}=require("../Middlewares/authenticator")
const {userModel}=require("../Models/user.model");
const {blacklistModel}=require("../Models/blockusermodel");

const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require("dotenv").config();

userRouter.get("/",(req,res)=>{
    res.send("default route")
})
userRouter.post("/signup",async(req,res)=>{
    const {name,email,password,role}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({msg:"something went wrong",err:err})
            }else{
                const newuser=new userModel({name,email,password:hash,role})
                await newuser.save();
                res.send({msg:"new user has been registered"})
            }
        })


    } catch (error) {
        res.send({msg:"something went wrong",error})
    }
})

userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isuserpresent=await userModel.findOne({email});
        if(!isuserpresent){
            return res.send({msg:"user not present in db , please register first"});
            console.log("sddfdf")
        }
        const correctpassword= await bcrypt.compareSync(password,isuserpresent.password);
        if(!correctpassword){
            return res.send({msg:"invalid credentials"})
        }

        const token= await jwt.sign({email,userid:isuserpresent._id,role:isuserpresent.role},process.env.token_key,{expiresIn:"30m"})
        const refreshtoken= await jwt.sign({email,userid:isuserpresent._id,role:isuserpresent.role},process.env.ref_token_key,{expiresIn:"1h"})
        res.send({msg:"Login successful",token,refreshtoken})
    } catch (error) {
        res.send({msg:"something went wrong",error})    
    } 
})

userRouter.get("/logout",authenticator,async(req,res)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        // const blacklist= await blacklistModel.find()
        const newbalcklist_user=new blacklistModel({token})
        await newbalcklist_user.save();
        res.send({msg:"logout Successfull"})
    } catch (error) {
        res.send({msg:"something went wrong",error}) 
    }
})

userRouter.get("/getnewtoken",authenticator,async(req,res)=>{
    const refreshToken=req.headers.authorization.split(" ")[1];
    if(!refreshToken) res.send({msg:"plz login again"})

    jwt.verify(refreshToken,process.env.ref_token_key,async(err,decoded)=>{
        if(!decoded){
            res.send({msg:"plz login again",error:err})
        }else{
            const token = await jwt.sign({email:decoded.email,userId:decoded.userId},process.env.token_key,{ expiresIn: "7d" });
            res.send({msg:"Login Successfull and New token genrated successfully",Token:token})
        }
    })
})


module.exports={
    userRouter
}









// const express = require("express");
// const UserRouter = express.Router();
// const { UserModel } = require("../Models/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const fs = require("fs");
// const nodemailer = require("nodemailer");
// // const {BlacklistuserModel}=require("../Models/blockusermodel");


// UserRouter.get('/',(req,res)=>{
//   res.send('Home')
// })

// UserRouter.post("/signup", async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//     //   let blackuser=await BlacklistuserModel.find({block_email:email})
//     //   if(blackuser){
//     //     return res.send({msg:'You have been Blocked'})
//     //   };
      
//       const signedata = await UserModel.find({ email });
//       if (signedata.length == 0) {
//         bcrypt.hash(password, 5, async (err, hash) => {
//           if (!err) {
//             let data = { name, email, password: hash };
//             const UserData = new UserModel(data);
//             await UserData.save();
//             res.send({ msg: "Successfully Signed Up" });
//           } else {
//             console.log(err);
//             // res.send(err)
//             res.send({ error: err });
//           }
//         });
//       } else {
//         res.send({ msg: "You have been already Signed Up" });
//       }
//     } catch (error) {
//       console.log(error);
//       console.log("something went wrong");
//       res.send({ error: error });
//     }
//   });

//   UserRouter.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await UserModel.find({ email });
//       if (user.length > 0) {
//         bcrypt.compare(password, user[0].password, (err, result) => {
//           if (result) {
//             const token = jwt.sign({ User: user[0]._id }, process.env.secreateKey);
//             res.send({
//               msg: "User Logged In Successfully",
//               Token: token
//               });
//           } else {
//             res.send({ msg: "Wrong password", ok: false });
//           }
//         });
//       } else {
//         res.send({ msg: "Wrong credentials", ok: false });
//       }
//     } catch (error) {
//       res.send({ msg: "Something went wrong", error: error.message, ok: false });
//     }
//   });

// // UserRouter.get("/refresh", async (req, res) => {
// //   let token = req.headers.authorization;
// //   if (token) {
// //     let decoded = jwt.verify(token, process.env.Refresh_token_secret);
// //     if (decoded) {
// //       console.log(decoded);
// //       let dataid = decoded.dataid;
// //       let new_token = jwt.sign({ dataid }, process.env.token_secret, {
// //         expiresIn: 60,
// //       });
// //       res.send({ msg: "referesh token generrated", new_token });
// //     }
// //   } else {
// //     res.send({ msg: "login again" });
// //   }
// // });

// // UserRouter.post("/logout", async (req, res) => {
// //   try {
// //     let token = req.headers.authorization;
   
// //     let blacklistAcc = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"));
// //     console.log(blacklistAcc);
// //     blacklistAcc.push(token);
// //     console.log(blacklistAcc);
// //     fs.writeFileSync("./blacklist.json", JSON.stringify(blacklistAcc));
// //     res.send({ msg: "logout successfull" });
// //   } catch (error) {
// //     console.log(error);
// //     res.send({ msg: "something went wrong" });
// //   }
// // });

// module.exports = {
//   UserRouter
// };
