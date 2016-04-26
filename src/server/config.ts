import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');
// Mongo
import mongodb = require('mongodb');

export function express(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('combined')); // logging

    app.use('/api/v1', require('./api').index());

    app.get('/*', (req:express.Request, res:express.Response) => {
        res.end('azaza');
    });
}

export function database() {
    var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true});
    var db = new mongodb.Db('mydb', server, {w: 1});
    db.open(function () {
    });
}