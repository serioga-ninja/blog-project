import AuthHelper = require('../../modules/controller/auth-helper');
import {UserService} from "../user/service";
import {UserModel} from "../user/model";
import {NotImplemented, AuthError} from "../../lib/api-error";
import {ApiController, controller} from "../../modules/controller/controller";
import {checkPassword} from "../../helpers/auth";
import {MyRequest} from "../../interfaces";
import Promise =require("bluebird");

export = class AuthController extends ApiController implements controller {
    urlPart:string = 'auth';

    constructor() {
        super();

        this.methods = [
            {
                method: this.authenticate,
                type: 'post',
                withId: false,
                uriPart: 'login',
                middleware: []
            }
        ];
    }

    public authenticate = (req:MyRequest) => {
        var username:string = req.body.username,
            password:string = req.body.password;

        return UserService.getByUsername(username).then((userData:UserModel._interface) => {
            if (!checkPassword(userData.password, password)) {
                throw new AuthError('Email or password mismatch');
            }

            return new AuthHelper().generateToken(userData._id).then((token:string) => {
                return {
                    token: token
                };
            })
        });
    };

    public single = () => {
        return Promise.resolve(() => {
            throw new NotImplemented();
        });
    };

    public save = () => {
        return Promise.resolve(() => {
            throw new NotImplemented();
        });
    };

    public create = () => {
        return Promise.resolve(() => {
            throw new NotImplemented();
        });
    };

    public destroy = () => {
        return Promise.resolve(() => {
            throw new NotImplemented();
        });
    };

    public query = () => {
        return Promise.resolve(() => {
            throw new NotImplemented();
        });
    };
}