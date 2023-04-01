const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const {userModel}=require("../Models/user.model")
const { v4: uuidv4 } = require('uuid');
const passport=require("passport")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4500/oauth/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
    let email=profile._json.email
    let name=profile._json.name
    const user=new userModel({
        name,email,password:uuidv4()

    })
    await user.save()
    return cb(null,user)
    //console.log(profile)
  }
));

module.exports={
    passport
}