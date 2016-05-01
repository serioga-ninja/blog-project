import * as express from "express";
import {PostsController} from "../controllers/posts";
import mongoose = require('mongoose');

var app = express();

export function index() {
    app.get('/', PostsController.all);
    // app.get('/:username', UserController.findByUsername);
    app.post('/new', PostsController.create);
    // app.put('/:username', UserController.update);
    // app.delete('/:username', UserController.destroy);

    return app;
}