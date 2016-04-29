import * as express from "express";

var app = express();

export function index() {
    
    app.use('/users', require('./users').index());
    app.use('/users', require('./posts').index());

    return app;
}
