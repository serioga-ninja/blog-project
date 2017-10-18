import {AuthHelperController} from '../lib/controller/auth-helper';
import {UserService} from '../services/user.service';
import {AuthError} from '../lib/api-error';
import {checkPassword} from '../helpers/auth';
import {Request, Response} from 'express';
import {IUserDocument} from '../models/user.model';
import {RouterController} from '../classes/router-controller';
import {RoutingHandlerDecorator} from '../lib/routing-handler.decorator';

let authHelper = AuthHelperController.getAuthHelper();

class AuthController extends RouterController {

  @RoutingHandlerDecorator
  public authenticate(req: Request, res: Response): Promise<void | Response> {
    let {username, password} = req.body;

    return UserService.getByUsername(username)
      .then((userData: IUserDocument) => {
        if (!checkPassword(userData.password, password)) {
          throw new AuthError('Email or password mismatch');
        }

        return authHelper.generateToken(userData._id).then((token: string) => {
          return {
            token: token
          };
        })
      })
      .then(data => res.json(data));
  };

  init() {
    this.router.post('/login', this.authenticate.bind(this));
  }
}

let authController = new AuthController();

authController.init();

export default authController.router;
