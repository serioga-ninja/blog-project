import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');
import fs = require('fs');
import Promise = require('bluebird');
var path = require('path');

// Mongo
import mongoose = require('mongoose');
import {Express} from "express";

export function expresss(app:Express) {
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
        // 'auth',
        // 'comments',
        // 'posts',
        'user'
    ];

    for (var i = 0; i < modules.length; i++) {
        // var router = './modules/' + modules[i] + '/router';
        var controller = './modules/' + modules[i] + '/controller';
        // if(fs.existsSync(router)) {
        //     require(router).index(app);
        // }
        var Controller = require(controller);
        (new Controller()).register(app);
    }

    app.get('/*', (req:express.Request, res:express.Response) => {
        res.sendFile('index.html', {root: __dirname + '/../../src/client'});
    });
}

export function database() {
    mongoose.connect('mongodb://localhost/blog_project');
}

export function prepare() {
    if (!Promise.prototype.spread) {
        Promise.prototype.spread = function (fn) {
            return this.then(function (args) {
                return Promise.all(args); // wait for all
            }).then(function (args) {
                //this is always undefined in A+ complaint, but just in case
                return fn.apply(this, args);
            });

        };
    }
}

export default {
    jwt: {
        expiresIn: 60 * 60 * 24 * 7,
        algorithm: 'HS256'
    }
}