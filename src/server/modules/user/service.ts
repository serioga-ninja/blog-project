import {UserModel} from "./model";
import {APIError} from "../../lib/api-error";

export module UserService {

    export function getByUsername(username:String):Promise<UserModel._interface> {
        return new Promise < UserModel._interface >((resolve, reject) => {
            UserModel.model.findOne({username: username}).exec((err, user) => {
                if (!user) {
                    reject(new APIError('User not found!', 404));
                }
                err ? reject(err) : resolve(user);
            });
        })
    }

    export function getByUsernameObject(username:String):Promise<Object> {
        return getByUsername(username).then((user) => {
            return user.toObject();
        })
    }
}