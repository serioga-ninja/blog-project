import {UserModel} from "./model";
import {ApiController} from "../../lib/controller/controller";

export class UserController extends ApiController<any> {
    urlPart:string = 'users';

    constructor() {
        super(UserModel);
    }
}
