const express = require("express")
const path = require("path")
const cookieParser = require('cookie-parser')



require("dotenv").config()
const { passport } = require("../Configs/google-oauth")
const oauthRouter = express.Router();

oauthRouter.get("/", (req, res) => {
  res.send("API base endpoint")

})

// oauthRouter.get("/oauthlogin", (req, res) => {

//   console.log("inOauthLogin")

//   res.cookie("user", `${req.user.email}`)
//   console.log(req.user.cookie)

//   res.writeHead(301, { Location: "https://glowing-gumption-f9f45a.netlify.app/" });
//   res.end();


// })

oauthRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', "email"] }));

oauthRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)

    res.writeHead(301, { Location: "https://glowing-gumption-f9f45a.netlify.app/" });
    res.end();
    // res.redirect('http://localhost:4500/oauth/oauthlogin');
  });


module.exports = {
  oauthRouter
}