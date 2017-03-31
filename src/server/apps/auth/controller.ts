import {AuthHelperController} from  '../../lib/controller/auth-helper';
import {UserService} from "../user/service";
import {AuthError} from "../../lib/api-error";
import {checkPassword} from "../../helpers/auth";
import {MyRequest} from "../../interfaces";
import {IUserDocument} from "../user/model";
import controller = BlogProject.Controller.controller;
import {ApiController} from "../../lib/controller/controller";

let AuthHelper = AuthHelperController.getAuthHelper();


export class AuthController extends ApiController<any> implements controller {
    urlPart: string = 'auth';

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

    public authenticate = (req: MyRequest) => {
        let username: string = req.body.username,
            password: string = req.body.password;

        return UserService.getByUsername(username).then((userData: IUserDocument) => {
            if (!checkPassword(userData.password, password)) {
                throw new AuthError('Email or password mismatch');
            }

            return new AuthHelper().generateToken(userData._id).then((token: string) => {
                return {
                    token: token
                };
            })
        });
    };
}
