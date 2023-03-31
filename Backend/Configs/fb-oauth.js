const FacebookStrategy = require('passport-facebook').Strategy;
const passport2=require("passport")
const{userModel}=require("../Models/user.model")
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()

passport2.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4500/fboauth/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async function(accessToken, refreshToken, profile, cb) {
    let email=profile._json.email
     let name=profile._json.name
     const user=new userModel({
         name,email,password:uuidv4()
         
 
     })
    
     await user.save()
     return cb(null,user)
   }
 ));
module.exports={
    passport2
}