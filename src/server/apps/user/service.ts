import {UserModel, IUserDocument} from "./model";
import {APIError} from "../../lib/api-error";
import Promise = require('bluebird');

export module UserService {

  export function getByQuery(query): Promise<IUserDocument> {
    return new Promise <IUserDocument>((resolve, reject) => {
      UserModel.findOne(query).exec((err, user) => {
        if (!user) {
          reject(new APIError('User not found!', 404));
        }
        err ? reject(err) : resolve(user);
      });
    })
  }

  export function getByUsername(username: string): Promise<Object> {
    return getByQuery({username: username}).then((user) => {
      return user.toObject();
    });
  }

  export function getById(id: string): Promise<Object> {
    return getByQuery({_id: id}).then((user) => {
      return user.toObject();
    });
  }
}
