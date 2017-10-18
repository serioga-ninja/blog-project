import * as mongoose from 'mongoose';
import {APIError, AuthError, BaseError, NotFound} from './api-error';
import * as jwt from 'jsonwebtoken';
import * as Promise from 'bluebird';

export function routingHandlerFactory(fn, instance) {
  let method = Promise.method(fn);

  return function (...args) {
    let [request, response] = args;

    return method
      .apply(instance, args)
      .then()
      .catch(AuthError, (err: BaseError) => {
        response.status(err.code).json(err.responseBody());
      }).catch(APIError, (err) => {
        response.status(err.code).json(err.responseBody());
      }).catch(mongoose.Error, (err) => {
        let errors = {};
        // _.each(err.errors, (error, field) => {
        //   errors[field] = error.message;
        // });
        response.status(400).json(err.responseBody());
      }).catch(jwt.JsonWebTokenError, (err) => {
        console.error(err.stack);
        response.status(401).json(err.responseBody());
      }).catch(NotFound, (err) => {
        response.status(err.code).json(err.responseBody());
      }).catch((err) => {
        console.error(err.stack);
        response.status(500).json(err.stack);
      });
  }
}

export function RoutingHandlerDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

  descriptor.value = routingHandlerFactory(descriptor.value, target);
}

