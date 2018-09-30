const winston = require('winston');

module.exports = winston.createLogger({
    transports : [
        new winston.transports.File({
            level: 'info',
            filename: 'log/teste.log'
        })
    ]
})