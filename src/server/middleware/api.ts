import Promise = require('bluebird');
import {MiddlewareError, NotFound}  from "../lib/api-error";
import mongoose = require('mongoose');
import {ERROR_MESSAGES} from "../helpers/messages";
import * as interfaces from "../interfaces";


export function hasIdAttribute(idAttribute:string) {

    return Promise.method((req:interfaces.MyRequest) => {
        if (!req.params[idAttribute]) {
            throw new MiddlewareError('Id attribute doesn\'t set.');
        }
    })
}

export function preload(idAttribute:string, model:mongoose.Model<any>) {
    return Promise.method((req:interfaces.MyRequest) => {
        var search = {};
        search[idAttribute] = req.params[idAttribute];
        return model
            .findOne(search)
            .exec()
            .then((entity) => {
                if (!entity) {
                    throw new NotFound(ERROR_MESSAGES.not_found);
                }
                req.model = entity;
            });
    });
}