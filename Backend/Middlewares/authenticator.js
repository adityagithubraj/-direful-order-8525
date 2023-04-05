const jwt = require("jsonwebtoken");

const { blacklistModel } = require("../Models/blockusermodel")
const { userModel } = require("../Models/user.model")
require("dotenv").config();

const authenticator = async (req, res, next) => {
    const Token = req.headers?.authorization?.split(" ")[1]

    try {
        if (!Token) {
            return res.status(401).send({ msg: "Please login first" })
        }
        const blacklist = await blacklistModel.findOne({ token: Token });
        if (blacklist) {
            return res.status(401).send({ msg: "You are blacklisted with this token please login again" })
        }

        const decodedToken = jwt.verify(Token, process.env.token_key);
        const { userid } = decodedToken;

        // Check if the user exists
        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized1' });
        }

        // Attach the user to the request object
        req.user = user;

        next();
    } catch (error) {
        if(error.message=="jwt expired"){
            res.status(403).json({msg:"jwt expired"})
        }
        else{
          return res.status(401).json({ msg: 'Unauthorized2',error });
        }
    }
}

module.exports = {
    authenticator
}