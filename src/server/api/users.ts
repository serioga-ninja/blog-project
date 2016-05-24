import * as express from "express";
import {UserController} from "../controllers/user";
import mongoose = require('mongoose');
import {AuthMiddleware} from "../middleware/auth";

var app = express();

export function index() {
    app.get('/:username', UserController.findByUsername);
    app.post('/new', UserController.findOrCreate);
    app.put('/:username', AuthMiddleware.isAuthorised, UserController.update);
    app.delete('/:username', AuthMiddleware.isAuthorised, UserController.destroy);

    return app;
}