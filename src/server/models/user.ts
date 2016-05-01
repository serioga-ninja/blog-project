import mongoose = require('mongoose');
import {PostModel, CommentModel} from "./index";
import * as auth from "../middlewares/auth";

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
            validate: validators.isAlpha()
        },
        lastName: {
            type: String,
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
        }
    }, {
        timestamps: {createdAt: 'created_at'}
    }).pre('save', function (next) {
        if (this.password) {
            this.password = auth.createHash(this.password);
        }
        next();
    }).pre('get', function (a, b, next) {
        delete this.password;
        next();
    });

    export var model = mongoose.model<_interface>('User', _schema);
}