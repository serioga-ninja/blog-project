import mongoose = require('mongoose');


var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

export module PostModel {

    export interface _interface extends mongoose.Document {
        id:string;
        title:string;
        content:string;
        authorId:string;
        created:Date;
        updated:Date;
    }

    export var _schema:mongoose.Schema = new mongoose.Schema({
        id: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        authorId: {
            type: ObjectId,
            ref: 'User'
        },
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

    export var model = mongoose.model<_interface>('Post', _schema);

}