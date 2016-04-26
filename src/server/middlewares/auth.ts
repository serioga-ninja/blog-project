import bCrypt = require('bcrypt-nodejs');

export function createHash(password):string {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}