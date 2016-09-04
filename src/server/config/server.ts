/**
 * Created by serioga on 04.09.16.
 */
import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');
import fs = require('fs');
import Promise = require('bluebird');
var path = require('path');

// Mongo
import {Express} from "express";


export = function (app: Express) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined')); // logging
    app.use(require('serve-static')(__dirname + '/../../public'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({extended: true}));
    app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
    app.use(express.static(__dirname + '/dist'));
    app.use('/ext', express.static(path.join(__dirname, '..', '..', 'dist', 'ext')));
    app.use('/scripts', express.static(path.join(__dirname, '..', '..', 'dist', 'scripts')));
    app.use('/templates', express.static(path.join(__dirname, '..', '..', 'dist', 'templates')));

    var modules = [
        'auth',
        // 'comments',
        // 'posts',
        'user'
    ];

    for (var i = 0; i < modules.length; i++) {
        // var router = './modules/' + modules[i] + '/router';
        var controller = '../modules/' + modules[i] + '/controller';
        // if(fs.existsSync(router)) {
        //     require(router).index(app);
        // }
        var Controller = require(controller);
        (new Controller()).register(app);
    }

    app.get('/*', (req: express.Request, res: express.Response) => {
        res.sendFile('index.html', {root: __dirname + '/../../src/client'});
    });
}