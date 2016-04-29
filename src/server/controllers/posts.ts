import {PostModel} from "../models";
import {APIMethod} from "../lib/api-method";
import * as express from "express";
import {Controller} from "./controller";

export class PostsController extends Controller {
    private _document:PostModel._interface;

    constructor(document:PostModel._interface) {
        this._document = document;
        super();
    }

    static create = APIMethod((req:express.Request) => {
        var data:PostModel._interface = req.body;

        return new Promise<PostsController>((resolve:Function, reject:Function) => {
            PostModel.model.create(data).onResolve((err, Post) => {
                err ? reject(err) : resolve(new PostsController(Post));
            });
        }).then((Post:PostsController)=> {
            return Post.fields;
        });
    });
}