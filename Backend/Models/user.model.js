const mongoose = require("mongoose")

const userScema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:"user",enum:["admin","user"]}
},{
    versionKey:false
})

const userModel = mongoose.model("user",userScema)

module.exports = {userModel}