import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');
var path = require('path');

// Mongo
import mongoose = require('mongoose');

export function expresss(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined')); // logging
    app.use(require('serve-static')(__dirname + '/../../public'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({extended: true}));
    app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));       
    app.use(express.static(__dirname + '/src/client'));
    app.use('/ext', express.static(path.join(__dirname, '..', '..', 'src', 'client', 'ext')));
    app.use('/app', express.static(path.join(__dirname, '..', '..', 'src', 'client', 'app')));

    app.use('/api/v1', require('./api').index());

    app.get('/*', (req:express.Request, res:express.Response) => {
        res.sendFile('index.html', {root: __dirname + '/../../src/client'});
    });
}

export function database() {
    mongoose.connect('mongodb://localhost/blog_project');
}