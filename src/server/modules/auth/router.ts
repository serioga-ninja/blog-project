import {AuthController} from './controller'

export function index(app) {
    app.post('/', AuthController.authenticate);

    return app;
}