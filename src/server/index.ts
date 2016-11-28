
import express = require("express");


let app = express();
require("./config/database")();
require("./config/server")(app);

export = app;