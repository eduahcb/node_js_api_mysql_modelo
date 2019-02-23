require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const morgan = require('morgan');
const logger = require('../src/util/logger');

module.exports = () =>{

    const app = express();

    app.use(morgan('combined', {
        skip : (req, res) => res.statusCode < 400,
        stream : {
           write: (mensage) => {
               logger.info(mensage);
           }
       }
    }))

    app.use(bodyParser.urlencoded( {extended: true}));
    app.use(bodyParser.json());
    
    app.use(validator());
    
    require('../src/connection/config')();
    require('../src/routes/routes')(app);
    return app;
}