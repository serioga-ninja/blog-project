import * as express from "express";

var app = express();

export function index() {
    
    app.use('/users', require('./user').index());

    return app;
}
