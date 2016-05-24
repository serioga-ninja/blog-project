import * as express from "express";
import {PostsController} from "../controllers/posts";
import mongoose = require('mongoose');
import {AuthMiddleware} from "../middleware/auth";

var app = express();

export function index() {
    app.get('/', PostsController.all);
    app.post('/:id/archive', PostsController.archive);
    app.delete('/:id', AuthMiddleware.isAuthorised, PostsController.remove);
    app.post('/new', AuthMiddleware.isAuthorised, PostsController.create);
    app.put('/:id', AuthMiddleware.isAuthorised, PostsController.update);

    return app;
}