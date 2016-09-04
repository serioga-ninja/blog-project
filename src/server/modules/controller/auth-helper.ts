import jwt  = require('jsonwebtoken');
import bCrypt = require('bcrypt-nodejs');
import constants = require('../../config/constants');
import environments = require('../../config/environment');

interface AuthHelperInterface {
    generateToken(id:string):void
    verify(id:string):void
}

class TokenAuth implements AuthHelperInterface {
    /**
     * Generate auth token
     * @param {String} id
     * @returns {Promise<string>}
     */
    public generateToken(id:string) {
        return new Promise((resolve) => {
            resolve(jwt.sign({id: id}, constants.secret, {algorithm: constants.jwt.algorithm}));
        });
    }

    public verify(token:string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, constants.secret, constants.jwt.algorithm, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded.id);
            })
        })
    }
}

export = {
    token: TokenAuth
}[environments.AUTHORIZATION];