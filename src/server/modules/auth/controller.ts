import AuthHelper = require('./helper');
import * as express from "express";
import {APIMethod} from "../../lib/api-method";
import {UserService} from "../user/service";
import {UserModel} from "../user/model";
import {APIError, NotImplemented} from "../../lib/api-error";
import {ApiController, controller} from "../../lib/controller";
import {Model} from "mongoose";


export = class AuthController extends ApiController implements controller {
    urlPart: 'auth';


    constructor() {
        super();

        this.methods = [
            {
                method: this.authenticate,
                type: 'get',
                withId: false,
                uriPart: 'login',
                middleware: []
            }
        ];
    }

    public authenticate = APIMethod((req: express.Request) => {
        var username: string = req.body.username,
            password: string = req.body.password;

        return UserService.getByUsername(username).then((userData: UserModel._interface) => {
            if (!AuthHelper.checkPassword(userData.password, password)) {
                throw new APIError('Email or password mismatch');
            }

            return AuthHelper.generateToken(userData._id).then((token: string) => {
                return {
                    token: token
                };
            })
        });
    });

    public single = APIMethod(() => {
        throw new NotImplemented();
    });

    public save = APIMethod(() => {
        throw new NotImplemented();
    });

    public create = APIMethod(() => {
        throw new NotImplemented();
    });

    public destroy = APIMethod(() => {
        throw new NotImplemented();
    });

    public query = APIMethod(() => {
        throw new NotImplemented();
    });
}