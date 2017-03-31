import * as express from "express";

export interface MyRequest extends express.Request {
    model?: any
}

export interface OrmInterface {
    update: Function
    createOne: Function
    remove: Function
    getAll: Function
}
