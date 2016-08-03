import * as express from "express";


export class AuthMiddleware {
    static isAuthorised = function (req:express.Request, res:express.Response, next:Function) {
        next();
    }
}