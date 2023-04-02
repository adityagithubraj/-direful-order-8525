const mongoose = require("mongoose")

const userScema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String ,default:"user",enum:["admin","user"]}
    // name:{type:String,required:true},
    // email:{type:String,required:true},
    // password:{type:String,required:true},
    // role:{type:String,required:true,default:"user",enum:["admin","user"]}
},{
    versionKey:false
})

const logSchema=mongoose.Schema({
    level:String,
    message:String
    
})


const userModel = mongoose.model("user",userScema)
const logsModel=mongoose.model("server_logs",logSchema)

module.exports = {userModel,logsModel}