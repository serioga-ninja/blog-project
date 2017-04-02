import * as express from "express";
import {AuthHelperController} from '../../lib/controller/auth-helper';
import {AuthError, NotFound} from "../../lib/api-error";
import {logger} from '../../lib/logger';
import * as Promise from 'bluebird';
import {MiddlewareMethod} from "../../lib/api-method";

let AuthHelper = AuthHelperController.getAuthHelper();


export class AuthMiddleware {
  public static isAuthorised() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      let fn: Function = descriptor.value;
      descriptor.value = MiddlewareMethod((...args) => {
        let req: express.Request = args[0];
        return new AuthHelper().verify(req.headers['token']).then((id) => {
          return fn.apply(target, args);
        }).catch(function (error) {
          logger.error(error.message);
          throw new NotFound('User not found!');
        });
      })
    }
  }
}
