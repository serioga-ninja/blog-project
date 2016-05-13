import * as express from "express";
import {AuthController} from '../controllers/auth'
import mongoose = require('mongoose');

var app = express();

export function index() {
    app.post('/', AuthController.authenticate);

    return app;
}