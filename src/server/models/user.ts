import mongoose = require('mongoose');
import {PostModel, CommentModel} from "./index";

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

export module UserModel {
    export interface _interface extends mongoose.Document {
        provider:string;
        id:string;
        username:string;
        firstName:string;
        lastName:string;
        email:string;
        password:string;
        created:Date;
        updated:Date;
    }

    export var _schema:mongoose.Schema = new mongoose.Schema({
        provider: {
            type: String,
            require: true
        },
        id: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        comments: [CommentModel._schema],
        posts: [PostModel._schema],
        created: {
            type: Date,
            default: Date.now
        },
        updated: {
            type: Date,
            default: Date.now
        }
    }).pre('save', function (next) {
        this.updated = new Date();
        next();
    });

    export var model = mongoose.model<_interface>('User', _schema);
}