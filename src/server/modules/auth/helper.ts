import * as jwt from 'jsonwebtoken';
import bCrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

export = class AuthHelper {

    /**
     * Generate auth token
     * @param id
     * @returns {Promise<any>|Promise}
     */
    public static generateToken(id: string) {
        return new Promise((resolve) => {
            resolve(jwt.sign({id: id}, 'sometokenhere', {algorithm: 'HS256'}));
        });
    }

    public static createHash(password): string {
        return ['sha1', 'salt',
            crypto.createHash('sha1')
                .update('salt')
                .update(password)
                .digest('hex')
        ].join('$');
    }

    /**
     * Check if not hashed and hashed passwords right
     * @param {String} hashedPassword
     * @param {String} password
     * @returns {boolean}
     */
    public static checkPassword(hashedPassword: string, password: string): boolean {
        return AuthHelper.createHash(password) === hashedPassword;
    }
}