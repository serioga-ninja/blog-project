
import {UserModel} from "../models";
import {UserController} from "../controllers/user";
import {APIError} from "../lib/api-error";

export module UserService {
    
    export function getByUsername(username:String):Promise<UserController> {
        return new Promise < UserController >((resolve, reject) => {
            UserModel.model.findOne({username: username}).exec().onResolve((err, user) => {
                if (!user) {
                    reject(new APIError('User not found!', 404));
                }
                err ? reject(err) : resolve(new UserController(user));
            });
        })
    }
}