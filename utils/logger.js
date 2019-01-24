/**
 *  Logger - to a log file or console (if in debug mode)
 */

const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {
        service: "user-service"
    },
    transports: [
        // errors
        new winston.transports.File({
            filename: "./logs/error.log",
            level: "error",
            handleExceptions: true
        }),
        // errors + everything else
        new winston.transports.File({
            filename: "./logs/combined.log",
            handleExceptions: true
        }),
        // console if debug mode
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ]
});

module.exports = logger;

module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};