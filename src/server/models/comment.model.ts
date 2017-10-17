import * as mongoose from 'mongoose';

let Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

export interface ICommentModelDocument extends mongoose.Document {
  id: string;
  content: string;
  replyTo: string;
  authorId: string;
  postId: string;
}

export let CommentModelSchema: mongoose.Schema = new mongoose.Schema({
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
  }
}, {timestamps: {createdAt: 'created_at'}}).pre('save', function (next) {
  this.updated = new Date();
  next();
});

export let CommentModel = mongoose.model<ICommentModelDocument>('Comment', CommentModelSchema);
