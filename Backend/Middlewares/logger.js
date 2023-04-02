const winston = require("winston")
const expressWinston = require("express-winston")
require('winston-mongodb')
require("dotenv").config()


const logger = expressWinston.logger({
    transports: [
        // new winston.transports.Console({
        //     level: "info"
        // }),
        new winston.transports.MongoDB({
            level: "info",
            db: process.env.MongoURL,
            options: {
                useUnifiedTopology: true
            },
            collection: 'server_logs',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            metaKey:"meta"
        })
    ],
    meta:true
})


module.exports={
    logger
}