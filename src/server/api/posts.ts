import * as express from "express";
import {PostsController} from "../controllers/posts";
import mongoose = require('mongoose');

var app = express();

export function index() {
    app.get('/', PostsController.all);
    app.post('/:id/archive', PostsController.archive);
    app.delete('/:id', PostsController.remove);
    app.post('/new', PostsController.create);
    app.put('/:id', PostsController.update);

    return app;
}