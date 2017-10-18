import {UserModel, IUserDocument} from '../models/user.model';
import {APIError} from '../lib/api-error';

export class UserService {

  public static getByQuery(query): Promise<IUserDocument> {
    return new Promise<IUserDocument>((resolve, reject) => {
      UserModel.findOne(query).exec((err, user) => {
        if (!user) {
          reject(new APIError('User not found!'));
        }
        err ? reject(err) : resolve(user);
      });
    })
  }

  public static getByUsername(username: string): Promise<Object> {
    return UserService.getByQuery({username: username}).then((user) => {
      return user.toObject();
    });
  }

  public static getById(id: string): Promise<Object> {
    return UserService.getByQuery({_id: id}).then((user) => {
      return user.toObject();
    });
  }
}
