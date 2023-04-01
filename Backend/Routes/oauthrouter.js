const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser')
 


require("dotenv").config()
const { passport } = require("../Configs/google-oauth")
const oauthRouter = express.Router();

oauthRouter.get("/", (req, res) => {
  res.send("API base endpoint")

})

oauthRouter.get("/oauthlogin", (req, res) => {

  res.writeHead(301, { Location: "https://nimble-sunflower-9c171f.netlify.app/" });
  res.end();
  // res.status(201).json({ msg: "google login successfull" })
  // const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  // const REDIRECT_URI = 'http://localhost:3000/index.html';

  // const AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile%20email&response_type=code`;

  // window.location.href = AUTH_URL;

})

oauthRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', "email"] }));

oauthRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)

    res.cookie("user", `${req.user.email}`)
    console.log(req.cookie)

    res.writeHead(301, { Location: "https://nimble-sunflower-9c171f.netlify.app/" });
    res.end();
    // res.redirect('/oauth/oauthlogin');
  });


module.exports = {
  oauthRouter
}