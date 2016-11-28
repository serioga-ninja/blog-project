/**
 * Created by serioga on 04.09.16.
 */
import mongoose = require('mongoose');
import environment = require('./environment');

export  = function () {
    mongoose.Promise = require('bluebird');
    mongoose.connect('mongodb://' + [environment.DB_HOST, environment.DB_NAME].join('/'));

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('We are connected!');
    });
}