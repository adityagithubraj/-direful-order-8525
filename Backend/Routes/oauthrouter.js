const express=require("express")
require("dotenv").config()
const {passport}=require("../Configs/google-oauth")
const oauthRouter=express.Router();

oauthRouter.get("/",(req,res)=>{
    res.send("API base endpoint")
    
})

oauthRouter.get("/oauthlogin",(req,res)=>{
    res.sendFile("C:/Users/HP/Documents/GitHub/-direful-order-8525/frontend/login and sigup/index.html")
    
})

oauthRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile',"email"] }));

oauthRouter.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login',session:false }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/oauth/oauthlogin');
  });


module.exports={
  oauthRouter
}