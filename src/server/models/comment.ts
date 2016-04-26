import mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

export module CommentModel {
    export interface _interface extends mongoose.Document {
        id:string;
        content:string;
        replyTo:string;
        authorId:string;
        postId:string;
        created:Date;
        updated:Date;
    }

    export var _schema:mongoose.Schema = new mongoose.Schema({
        id: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        replyTo: {
            type: ObjectId,
            ref: 'Comment'
        },
        authorId: {
            type: ObjectId,
            ref: 'User'
        },
        postId: {
            type: ObjectId,
            ref: 'Post'
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

    export var model = mongoose.model<_interface>('Comment', _schema);
}