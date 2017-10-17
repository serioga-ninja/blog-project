import * as express from 'express';
import {APIError, AuthError} from './api-error';
import * as _ from 'lodash';
import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import {NextFunction} from 'express';


export function APIMethod(fn: (...args: any[]) => any): Function {
  let method = Promise.method(fn);

  return (request: express.Request, response: express.Response) => {
    return method.call(this, request, response).then((res: Object) => {
      response.status(200).json(res);
    }).catch(AuthError, (err) => {
      response.status(err.code).json(err.message);
    }).catch(APIError, (err) => {
      response.status(err.code).json(err.message);
    }).catch(mongoose.Error, (err) => {
      let errors = {};
      // _.each(err.errors, (error, field) => {
      //   errors[field] = error.message;
      // });
      response.status(400).json(errors);
    }).catch(jwt.JsonWebTokenError, (err) => {
      console.error(err.stack);
      response.status(401).json(err);
    }).catch((err) => {
      console.error(err.stack);
      response.status(500).json(err.stack);
    });
  }
}

export function MiddlewareMethod(fn: (...args: any[]) => any): Function {
  let method = Promise.method(fn);

  return (request: express.Request, response: express.Response, next: NextFunction) => {
    return method.call(this, request, response, next)
      .catch(function (err: Error) {
        console.error(err.stack);
        response.status(400).json(err.message);
      });
  }
}
