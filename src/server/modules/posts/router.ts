import {PostsController} from "./controller";
import {AuthMiddleware} from "../auth/middleware";

export function index(app) {
    app.get('/', PostsController.all);
    app.post('/:id/archive', PostsController.archive);
    app.delete('/:id', AuthMiddleware.isAuthorised, PostsController.remove);
    app.post('/new', AuthMiddleware.isAuthorised, PostsController.create);
    app.put('/:id', AuthMiddleware.isAuthorised, PostsController.update);

    return app;
}