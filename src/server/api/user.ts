import * as express from "express";
import {UserController} from "../controllers/user";
import mongoose = require('mongoose');

var app = express();

export function index() {
    app.get('/:username', UserController.findByUsername);
    app.post('/new', UserController.findOrCreate);
    app.put('/:username', UserController.update);

    return app;
}