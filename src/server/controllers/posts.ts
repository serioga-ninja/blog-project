import {PostModel} from "../models";
import {APIMethod} from "../lib/api-method";
import * as express from "express";

export class PostsController {
    private _document:PostModel._interface;

    constructor(document:PostModel._interface) {
        this._document = document;
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


    get fields():Object {
        return this._document;
    }
}