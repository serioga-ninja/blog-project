import  {AuthController} from "./controller";

export = function index(app) {
  new AuthController().register(app);
  return app;
}
