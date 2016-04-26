import mongoose = require('mongoose');
import {PostModel, CommentModel} from "./index";

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    validators = require('mongoose-validators');

export module UserModel {
    export interface _interface extends mongoose.Document {
        provider:string;
        id:string;
        username:string;
        firstName:string;
        lastName:string;
        email:string;
        password:string;
    }

    export var _schema:mongoose.Schema = new mongoose.Schema({
        id: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true,
            unique: true,
            validate: validators.isAlpha()
        },
        firstName: {
            type: String,
            require: true,
            validate: validators.isAlpha()
        },
        lastName: {
            type: String,
            require: true,
            validate: validators.isAlpha()
        },
        email: {
            type: String,
            require: true,
            validate: validators.isEmail()
        },
        password: {
            type: String,
            require: true
        },
        comments: [CommentModel._schema],
        posts: [PostModel._schema]
    }, {timestamps: {createdAt: 'created_at'}}).pre('save', function (next) {
        this.updated = new Date();
        next();
    });

    export var model = mongoose.model<_interface>('User', _schema);
}