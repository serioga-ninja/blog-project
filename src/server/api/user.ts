import * as express from "express";
import {UserController} from "../controllers/user";
import {APIMethod} from "../lib/api-method";
import mongoose = require('mongoose');

var app = express();

export function index() {
    // app.get('/:id', APIMethod((req:express.Request, res:express.Response) => {
    //     return UserController.findOrCreate(req.params.id).then((user:mongoose.Model) => {
    //         return user;
    //     });
    // }));

    app.post('/new', APIMethod((req:express.Request, res:express.Response) => {
        return UserController.findOrCreate(req.body).then((User:UserController) => {
            return User.fields;
        });
    }));

    return app;
}