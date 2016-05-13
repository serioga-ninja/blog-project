import {AuthHelper} from '../helpers/auth';
import * as express from "express";
import {APIMethod} from "../lib/api-method";
import {UserService} from "../services";
import {UserModel} from "../models";
import {APIError} from "../lib/api-error";

export class AuthController {

    static authenticate = APIMethod((req:express.Request) => {
        var username:string = req.body.username,
            password:string = req.body.password;

        return UserService.getByUsernameObject(username).then((userData:UserModel._interface) => {
            if (!AuthHelper.checkPassword(userData.password, password)) {
                throw new APIError('Email or password mismatch');
            }

            return AuthHelper.generateToken(userData._id).then((token:string) => {
                return {
                    token: token
                };
            })
        });
    });

}