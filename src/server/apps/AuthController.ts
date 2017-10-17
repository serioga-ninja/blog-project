import {AuthHelperController} from '../lib/controller/auth-helper';
import {UserService} from '../services/user.service';
import {AuthError} from '../lib/api-error';
import {checkPassword} from '../helpers/auth';
import {MyRequest} from '../interfaces';
import {IUserDocument} from '../models/user.model';
import {RouterController} from '../classes/router-controller';

let authHelper = AuthHelperController.getAuthHelper();

export class AuthController extends RouterController {

  public authenticate(req: MyRequest) {
    let username: string = req.body.username,
      password: string = req.body.password;

    return UserService.getByUsername(username).then((userData: IUserDocument) => {
      if (!checkPassword(userData.password, password)) {
        throw new AuthError('Email or password mismatch');
      }

      return authHelper.generateToken(userData._id).then((token: string) => {
        return {
          token: token
        };
      })
    });
  };

  init() {

  }
}
