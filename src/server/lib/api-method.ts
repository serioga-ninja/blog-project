import * as express from "express";
import {APIError} from "./api-error";
import * as _ from "lodash";
import Promise = require('bluebird');
var mongoose = require("mongoose");


export function APIMethod(fn:Function):Function {
    var method = Promise.method(fn);

    return (request:express.Request, response:express.Response) => {
        method(request, response).then((res:Object) => {
            response.status(200).json(res);
        }).catch(APIError, (err) => {
            response.status(err.code).json(err.message);
        }).catch(mongoose.Error, (err) => {
            var errors = {};
            _.each(err.errors, (error, field) => {
                errors[field] = error.message;
            });
            response.status(403).json(errors);
        }).catch((err) => {
            response.status(500).json(err.stack);
        });
    }
}

export function MiddlewareMethod(fn:Function):Function {
    var method = Promise.method(fn);

    return function (request, response, next) {
        return method(request, response)
            .then(function () {
                next();
            });
    }
}