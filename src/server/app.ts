
import * as express from "express";
import config = require("./config");


var app = express();

config.express(app);
config.database();

export = app;