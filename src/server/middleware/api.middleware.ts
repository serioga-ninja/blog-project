import * as Promise from 'bluebird';
import {MiddlewareError, NotFound} from '../lib/api-error';
import * as mongoose from 'mongoose';
import {ERROR_MESSAGES} from '../helpers/messages';
import * as interfaces from '../interfaces';

export class ApiMiddleware {
  public static hasIdAttribute(idAttribute: string) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      let fn: Function = descriptor.value;
      descriptor.value = Promise.method((...args) => {
        let req: interfaces.MyRequest = args[0];
        if (!req.params[idAttribute]) {
          throw new MiddlewareError('Id attribute doesn\'t set.');
        }
        return fn.apply(target, args);
      })
    };
  }

  public static preload(idAttribute: string, model: mongoose.Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      let fn: Function = descriptor.value;
      descriptor.value = Promise.method((...args) => {
        let req: interfaces.MyRequest = args[0];
        let search = {};
        search[idAttribute] = req.params[idAttribute];
        return model
          .findOne(search)
          .exec()
          .then((entity) => {
            if (!entity) {
              throw new NotFound(ERROR_MESSAGES.not_found);
            }
            req.model = entity;

            return fn.apply(target, args);
          });
      })
    };
  }

}
