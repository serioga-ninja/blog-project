import * as express from "express";
import AuthHelper = require('../../modules/controller/auth-helper');
import {AuthError} from "../../lib/api-error";


export class AuthMiddleware {
    static isAuthorised = function (req:express.Request) {
        return new AuthHelper().verify(req.headers['token']).then((id) => {
            console.log('id', id);
        });
    }
}