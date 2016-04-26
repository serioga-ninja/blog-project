import passport= require('passport');
import {UserModel} from "../models";
import {APIError} from "../lib/api-error";
import * as auth from "../middlewares/auth";
import mongoose = require('mongoose');
import Promise = require('bluebird');

export class UserController {
    private _document:UserModel._interface;

    constructor(document:UserModel._interface) {
        this._document = document;
    }

    static findOrCreate(data:UserModel._interface):Promise <UserController> {
        return new Promise <UserController>((resolve:Function, reject:Function) => {
            UserModel.model.findOne({
                username: data.username
            }).exec().then(user => {
                if (user) {
                    reject(new APIError('Username already exists.'));
                }
                data.password = auth.createHash(data.password);

                UserModel.model.create(data).onResolve((err, user) => {
                    err ? reject(err) : resolve(new UserController(user));
                });
            });
        });
    }

    static findById(id:string):Promise < UserController > {
        return new Promise < UserController >((resolve, reject) => {
            UserModel.model.findById(id)
                .exec()
                .onResolve((err, user) => {
                    err ? reject(err) : resolve(new UserController(user));
                });
        })
    }

    static create(data:Object):Promise<UserController> {
        return new Promise <UserController>((resolve, reject) => {
            UserModel.model.create(data).onResolve((err, user) => {
                err ? reject(err) : resolve(new UserController(user));
            });
        });
    }

    get fields():Object {
        return this._document;
    }
}