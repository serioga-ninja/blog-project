import * as jwt from "jsonwebtoken";
import * as bCrypt from "bcrypt-nodejs";
import {constants}from "../../config/constants";
import {environment} from "../../config/environment";
import * as Promise from "bluebird";


export abstract class AuthHelper {
  abstract generateToken(id: string): Promise<any>;
  abstract verify(token: string): Promise<any>;
}

class TokenAuth extends AuthHelper {
  /**
   * Generate auth token
   * @param {String} id
   * @returns {Promise<string>}
   */
  public generateToken(id: string) {
    return new Promise((resolve) => {
      resolve(jwt.sign({id: id}, constants.secret, {algorithm: constants.jwt.algorithm}));
    });
  }

  public verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, constants.secret, {algorithms: [constants.jwt.algorithm]}, (err, decoded) => {
        if (err) {
          return reject(err.message);
        }
        resolve(decoded.id);
      })
    })
  }
}

export class AuthHelperController {
  public static getAuthHelper() {
    return {
      token: TokenAuth
    }[environment.AUTHORIZATION];
  }
}
