import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as path from 'path';
import * as express from 'express';

import userController from './apps/UserController';
import postController from './apps/PostController';
import authController from './apps/AuthController';

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

    // Add headers
    this.express.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // Pass to next layer of middleware
      next();
    });
  }

  public routes() {
    this.express.use('/api/v1/auth', authController);
    this.express.use('/api/v1/users', userController);
    this.express.use('/api/v1/posts', postController);
  }
}


export default new Server().express;
