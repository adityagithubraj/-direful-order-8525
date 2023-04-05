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
    console.log(req.body)
    
    const {username,email,password,role}=req.body;
    
    try {
       let isuserpresent = await userModel.findOne({email})
       if(!isuserpresent){
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({msg:"something went wrong",err:err})
            }else{
                const newuser=new userModel({name:username,email,password:hash,role})
                console.log(newuser)
                await newuser.save();
                res.status(201).json({msg:"New user has been registered"})
            }
        })
        }
        else{
            return res.status(400).json({ message: 'User already exists' });
       }


    } catch (error) {
        res.send({msg:"something went wrong",error})
    }
})

 userRouter.post("/login",async(req,res)=>
//  {
    
//     try {
//         const {email,password}=req.body;
//         const isuserpresent=await userModel.findOne({email});
 
//         if(!isuserpresent){
//             return res.send({msg:"user not present in db , please register first"});
//         }
//         const correctpassword= await bcrypt.compareSync(password,isuserpresent.password);
//         if(!correctpassword){
//             return res.send({msg:"invalid credentials"})
//         }

//         const token= await jwt.sign({email,userid:isuserpresent._id,role:isuserpresent.role},process.env.token_key,{expiresIn:"30m"})
//         const refreshtoken= await jwt.sign({email,userid:isuserpresent._id,role:isuserpresent.role},process.env.ref_token_key,{expiresIn:"1h"})
//         console.log(isuserpresent)
//         if(isuserpresent.role=="admin"){
//             res.json({msg:"Login successful",token,refreshtoken,role:"admin"})
//             return
//         }
//         res.json({msg:"Login successful",token,refreshtoken})
//     } catch (error) {
//         console.log(error)
//         res.json({msg:"something went wrong",error})    
//     } 
// }

{
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ msg: 'Invalid username or password' });
      }
  
      // Compare the password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ msg: 'Invalid username or password' });
      }
  
      // Create a JWT
      const token = jwt.sign({ email,userid:user._id,role:user.role}, process.env.token_key, {
        expiresIn: '10m'
      });
  
      const refreshToken= jwt.sign({email,userid:user._id,role:user.role},process.env.ref_token_key,{
          expiresIn:"7d"
      })
      console.log({token,refreshToken})
      res.status(201).json({ token,refreshToken,name:user.name,role:user.role,msg:"Login Successfull" });
    } catch (error) {
      res.status(500).json({msg:error});
    }
  }
)

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

userRouter.get("/newtoken",async(req,res)=>{
    try {
        const refreshtoken=req?.headers?.authorization?.split(" ")[1]

        var decoded = jwt.verify(refreshtoken, process.env.ref_token_key);
        if(!decoded){
            res.json({msg:"refresh Token Expired,Plz login Again"})
        }

        const {userid}=decoded
        const user=await userModel.findById(userid)
        
        if(!user){
            res.status(401).json({msg:"Unauthorized,Plz Sign Up"})
        }

        const token = jwt.sign({ email,userid:user._id,role:user.role}, process.env.token_key, {
            expiresIn: '10m'
          });
      
          const refreshToken= jwt.sign({email,userid:user._id,role:user.role},process.env.ref_token_key,{
              expiresIn:"7d"
          })
        
        res.status(200).json({token,refreshToken})

    } catch (error) {
        console.log("err in refreshng token",error)
        res.status(401).json({msg:"Unauthorized,Plz Sign UP"})
    }
})


module.exports={
    userRouter
}
