import passport= require('passport');
import {UserModel} from "../models";
import {APIError} from "../lib/api-error";
import * as auth from "../middlewares/auth";
import {APIMethod} from "../lib/api-method";
import * as express from "express";
import {UserService} from "../services";
import mongoose = require('mongoose');
import Promise = require('bluebird');

export class UserController {
    private _document:UserModel._interface;

    constructor(document:UserModel._interface) {
        this._document = document;
    }

    static findOrCreate = APIMethod((req:express.Request) => {
        var data:UserModel._interface = req.body;

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
        }).then((User:UserController) => {
            return User.fields;
        });
    });

    /**
     * Return user by username
     * @returns {Promise<UserController>}
     */
    static findByUsername = APIMethod((req:express.Request) => {
        var username:string = req.params.username;
        return UserService.getByUsername(username);
    });

    static update = APIMethod((req:express.Request) => {
        var username:string = req.params.username,
            data:UserModel._interface = req.body;

        if (data.password) {
            data.password = auth.createHash(data.password);
        }
        return UserModel.model.update({username: username}, data, {runValidators: true}).exec().onResolve((err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                throw new APIError('User not found!', 404);
            }
            return user;
        });
    });

    static destroy = APIMethod((req:express.Request) => {
        var username:string = req.params.username;
        return UserModel.model.remove({username: username}).exec().onResolve((err) => {
            return 'OK'
        });
    });

    get fields():Object {
        return this._document;
    }
}