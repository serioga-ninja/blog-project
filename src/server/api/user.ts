import * as express from "express";

var app = express();

export function index() {
    app.get('/get', (req:express.Request, res:express.Response) => {
        res.end('You got user!');
    });

    return app;
}