import  {UserController} from "./controller";

export = function index(app) {
  new UserController().register(app);
  return app;
}
