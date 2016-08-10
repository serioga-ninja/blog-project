import {UserModel} from "./model";
import Promise = require('bluebird');
import {ApiController} from "../../lib/controller";
import mongoose = require('mongoose');

export = class UserController extends ApiController {
    urlPart:string = 'users';

    constructor() {
        super(UserModel.model);
    }
}