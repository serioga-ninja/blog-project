import * as express from "express";
import {APIError} from "./api-error";
import Promise = require('bluebird');


export function APIMethod(fn:Function) {
    var method = Promise.method(fn);

    return (request:express.Request, response:express.Response) => {
        method(request, response).then((res:Object) => {
            response.status(200).json(res);
        }).catch(APIError, (err) => {
            response.status(err.code).json(err.message);
        }).catch((err) => {
            console.log(err.stack);
            response.status(500).json(err.stack);
        });
    }
}