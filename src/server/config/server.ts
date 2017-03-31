import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');
import fs = require('fs');
import Promise = require('bluebird');
import path = require('path');
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined')); // logging
app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(express.static(__dirname + '/dist'));
app.use('/ext', express.static(path.join(__dirname, '..', '..', 'dist', 'ext')));
app.use('/scripts', express.static(path.join(__dirname, '..', '..', 'dist', 'scripts')));
app.use('/templates', express.static(path.join(__dirname, '..', '..', 'dist', 'templates')));

let modules = [
  'auth',
  // 'comments',
  // 'posts',
  'user'
];

for (let i = 0; i < modules.length; i++) {
  let router = '../apps/' + modules[i] + '/router';
  require(router)(app);
}

app.get('/*', (req: express.Request, res: express.Response) => {
  res.sendFile('index.html', {root: __dirname + '/../../src/client'});
});

app.listen(3000, function(){
  console.log("Demo Express server listening on port %d in %s mode", 3000, app.settings.env);
});
