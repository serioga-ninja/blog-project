
import * as express from "express";
import config = require("./config");


var app = express();

config.expresss(app);
config.prepare();
config.database();

export = app;