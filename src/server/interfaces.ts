import {Request} from "express-serve-static-core";

export interface MyRequest extends Request {
    model?: any
}

export interface OrmInterface {
    update: Function
    createOne: Function
    remove: Function
    getAll: Function
}