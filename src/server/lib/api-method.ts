import * as express from "express";
import {APIError, AuthError} from "./api-error";
import * as _ from "lodash";
import Promise = require('bluebird');
var mongoose = require("mongoose");
var jwt  = require('jsonwebtoken');


export function APIMethod(fn: Function): Function {
    var method = Promise.method(fn);

    return (request: express.Request, response: express.Response) => {
        method.call(this, request, response).then((res: Object) => {
            response.status(200).json(res);
        }).catch(AuthError, (err) => {
            response.status(err.code).json(err.message);
        }).catch(APIError, (err) => {
            response.status(err.code).json(err.message);
        }).catch(mongoose.Error, (err) => {
            var errors = {};
            _.each(err.errors, (error, field) => {
                errors[field] = error.message;
            });
            response.status(400).json(errors);
        }).catch(mongoose.Error.ValidationError, (err) => {
            response.status(400).json(err);
        }).catch(jwt.JsonWebTokenError, (err) => {
            console.error(err.stack);
            response.status(401).json(err);
        }).catch((err) => {
            console.error(err.stack);
            response.status(500).json(err.stack);
        });
    }
}

export function MiddlewareMethod(fn: Function): Function {
    var method = Promise.method(fn);

    return function (request, response, next) {
        return method(request, response)
            .then(function () {
                next();
            })
            .catch(function (err:Error) {
                console.error(err.stack);
                response.status(400).json(err.message);
            });
    }
}