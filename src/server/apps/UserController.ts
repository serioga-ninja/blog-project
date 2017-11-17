import {IUserDocument, UserModel} from '../models/user.model';
import {CrudController} from '../classes/crud-controller';
import * as mongoose from 'mongoose';
import {IUserModel} from '../interfaces/i-user-model';

class UserController extends CrudController<IUserModel> {
  urlPart: string = 'users';
  idAttribute: string = '_id';
  model: mongoose.Model<IUserDocument> = UserModel;
}

let userController = new UserController();
userController.init();

export default userController.router;
