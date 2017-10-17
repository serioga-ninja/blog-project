import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as path from 'path';
import * as express from 'express';

import userController from './apps/UserController';

class Server {
  public express: express.Application;

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.express = express();

    //configure application
    this.config();

    //add routes
    this.routes();
  }

  public config() {

    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(morgan('combined')); // logging
    this.express.use(require('serve-static')(__dirname + '/../../public'));
    this.express.use(require('cookie-parser')());
    this.express.use(require('body-parser').urlencoded({extended: true}));
    this.express.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
    this.express.use(express.static(__dirname + '/dist'));
    this.express.use('/ext', express.static(path.join(__dirname, '..', '..', 'dist', 'ext')));
    this.express.use('/scripts', express.static(path.join(__dirname, '..', '..', 'dist', 'scripts')));
    this.express.use('/templates', express.static(path.join(__dirname, '..', '..', 'dist', 'templates')));
  }

  public routes() {
    this.express.use('/api/v1/users', userController)
  }
}


export default new Server().express;
