require('dotenv').load();
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const validator = require('express-validator');

module.exports = () =>{

    const app = express();

    app.use(bodyParser.urlencoded( {extended: true}));
    app.use(bodyParser.json());
    
    app.use(validator());

    consign( {cwd : 'src'})
        .then('routes')
        .then('connection')
        .into(app);

    return app;
}