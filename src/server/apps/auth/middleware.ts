import express = require("express");
import AuthHelper = require('../../modules/controller/auth-helper');
import {AuthError, NotFound} from "../../lib/api-error";
import logger = require('../../lib/logger');


export class AuthMiddleware {
    static isAuthorised = function (req:express.Request) {
        return new AuthHelper().verify(req.headers['token']).then((id) => {
            console.log('id', id);
        }).catch(function (error) {
            logger.error(error.message);
            throw new NotFound('User not found!');
        });
    }
}