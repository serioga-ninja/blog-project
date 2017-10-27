import express from 'express';
import http from 'http';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';

import App from '../components/App';


export class Server {
  app;
  server;
  io;
  port;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);

    this.config();
    this.listen();
  }

  config() {
    this.port = process.env.PORT || 8080;
    this.app.use(express.static('public'));
    this.app.set('view engine', 'ejs');
  }

  listen() {

    this.app.get('*', function (req, res) {
      const context = {};

      const html = ReactDOMServer.renderToString(
        <StaticRouter
          location={req.url}
          context={context}
        >
          <App/>
        </StaticRouter>
      );
      console.log(html);

      res.render('index', {title: 'Express', data: false, content: html});
    });

    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });
  }
}

new Server();
