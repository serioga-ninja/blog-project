import bodyParser = require("body-parser");
import morgan = require('morgan');
import express = require('express');
import fs = require('fs');
import Promise = require('bluebird');
import path = require('path');


export class Server {
  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  public config() {

    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(morgan('combined')); // logging
    this.app.use(require('serve-static')(__dirname + '/../../public'));
    this.app.use(require('cookie-parser')());
    this.app.use(require('body-parser').urlencoded({extended: true}));
    this.app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
    this.app.use(express.static(__dirname + '/dist'));
    this.app.use('/ext', express.static(path.join(__dirname, '..', '..', 'dist', 'ext')));
    this.app.use('/scripts', express.static(path.join(__dirname, '..', '..', 'dist', 'scripts')));
    this.app.use('/templates', express.static(path.join(__dirname, '..', '..', 'dist', 'templates')));
  }

  public routes() {
    let modules = [
      'auth',
      // 'comments',
      // 'posts',
      'user'
    ];


    for (let i = 0; i < modules.length; i++) {
      let router = '../apps/' + modules[i] + '/router';
      require(router)(this.app);
    }

  }

  public api() {
    this.app.get('/*', (req: express.Request, res: express.Response) => {
      res.sendFile('index.html', {root: __dirname + '/../../src/client'});
    });

    this.app.listen(3000, () => {
      console.log("Demo Express server listening on port %d in %s mode", 3000, this.app.settings.env);
    });
  }
}
