import {constants} from '../config/constants';
let crypto = require('crypto');

export function createHash(password):string {
    return ['sha1', 'salt',
        crypto.createHash('sha1')
            .update(constants.secret)
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
export function checkPassword(hashedPassword:string, password:string):boolean {
    return createHash(password) === hashedPassword;
}
