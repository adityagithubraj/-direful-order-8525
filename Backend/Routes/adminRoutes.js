const express=require("express")
const {authenticator}=require("../Middlewares/authenticator")
const {userModel,logsModel}=require("../Models/user.model")

const  adminRoute=express.Router()

adminRoute.get("/userlist",async(req,res)=>{
    try {
        const users=await userModel.find()
        res.status(201).json({users:users})
    } catch (error) {
        console.log(error)
        res.status(501).json({msg:error.message})
    }
})


adminRoute.delete("/deleteUser/:id",async(req,res)=>{
    try {
        const id=req.params.id
        await userModel.findByIdAndDelete(id)
        res.status(200).json({msg:"User Deleted Successfully"})
    } catch (error) {
        
    }
})


// //....................................Getting Logs.........................................................

adminRoute.get("/logs",async(req,res)=>{
    try {
        const logs=await logsModel.aggregate([{$sort:{"timestamp":-1}},{$limit:30}])
        res.json({logs})
    } catch (error) {
        console.log(error)
        res.json({msg:error})
    }
})


module.exports={
    adminRoute
}