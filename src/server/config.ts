import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');

// Mongo
import mongoose = require('mongoose');

export function express(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined')); // logging
    app.use(require('serve-static')(__dirname + '/../../public'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({extended: true}));
    app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));       

    app.use('/api/v1', require('./api').index());

    app.get('/*', (req:express.Request, res:express.Response) => {
        res.end('azaza');
    });
}

export function database() {
    mongoose.connect('mongodb://localhost/blog_project');
}