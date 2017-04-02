import {UserModel} from "./model";
import {ApiController} from "../../lib/controller/controller";
import {MyRequest} from "../../interfaces";
import {ApiMiddleware} from "../../middleware/api";
import {AuthMiddleware} from "../auth/middleware";

export class UserController extends ApiController<any> {
  urlPart: string = 'users';

  constructor() {
    super(UserModel);
  }

  @AuthMiddleware.isAuthorised()
  @ApiMiddleware.hasIdAttribute('_id')
  @ApiMiddleware.preload('_id', UserModel)
  public single(...args) {
    return super.single.apply(this, args);
  }
}
