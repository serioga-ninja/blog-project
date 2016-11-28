import {PostModel} from "./model";
import {APIMethod} from "../../lib/api-method";
import express = require("express");
import Promise = require('bluebird')

export class PostsController {
    private _document: PostModel._interface;

    constructor(document: PostModel._interface) {
        this._document = document;
    }

    static create = APIMethod((req: express.Request) => {
        let data: PostModel._interface = req.body;

        return PostModel.model
            .create(data)
            .then((Post) => new PostsController(Post))
            .then((Post: PostsController) => Post.fields);
    });

    static update = APIMethod((req: express.Request) => {
        var data: PostModel._interface = req.body,
            id: string = req.params.id;

        return new Promise<PostsController>((resolve: Function, reject: Function) => {
            PostModel.model.update({id: id}, data).exec((err, Post) => {
                err ? reject(err) : resolve(new PostsController(Post));
            });
        }).then((Post: PostsController) => {
            return Post.fields;
        });
    });

    static all = APIMethod((req: express.Request) => {
        var query = req.query,
            pageNumber = query.page || 1,
            limit = query.limit || 10;


        return new Promise((resolve: Function, reject: Function) => {
            PostModel.model.find({posted: true})
                .skip((pageNumber - 1) * limit)
                .limit(limit)
                .sort({created_at: 1})
                .exec((err, Posts) => {
                    err ? reject(err) : resolve(Posts);
                });
        });
    });

    static archive = APIMethod((req: express.Request) => {
        var id: string = req.params.id;

        return new Promise((resolve: Function, reject: Function) => {
            PostModel.model.update({id: id}, {archived: true, archivedAt: new Date()}, (err, raw) => {
                err ? reject(err) : resolve('OK');
            });
        });
    });

    static remove = APIMethod((req: express.Request) => {
        var id: string = req.params.id;

        return new Promise((resolve: Function, reject: Function) => {
            PostModel.model.remove({id: id}, (err) => {
                err ? reject(err) : resolve('OK');
            });
        });
    });

    get fields(): Object {
        return this._document;
    }
}