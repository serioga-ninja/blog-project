
import * as express from "express";


var app = express();
require("./config/database")();
require("./config/dump")();
require("./config/server")(app);

export = app;