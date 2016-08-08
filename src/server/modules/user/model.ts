import mongoose = require('mongoose');
import {AuthHelper} from '../auth/helper';

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId,
    validators = require('mongoose-validators'),
    uniqueValidator = require('mongoose-unique-validator');

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
        var _this = this.toObject();
        if (this.password) {
            this.password = AuthHelper.createHash(_this.password);
        }
        next();
    }).pre('get', function (a, b, next) {
        delete this.password;
        next();
    });

    _schema.plugin(uniqueValidator);

    export var model = mongoose.model<_interface>('User', _schema);
}