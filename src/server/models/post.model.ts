import * as mongoose from 'mongoose';
import {IPostModel} from '../interfaces/i-post-model';

let Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;


export interface IPostModelDocument extends IPostModel, mongoose.Document {
}

export let PostModelSchema: mongoose.Schema = new mongoose.Schema({
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
  posted: {
    type: Boolean,
    default: false
  },
  postedAt: {
    type: Date
  },
  archived: {
    type: Boolean,
    default: false
  },
  archivedAt: {
    type: Date
  }
}, {timestamps: {createdAt: 'created_at'}}).pre('save', function (next) {
  this.updated = new Date();
  next();
});

export let PostModel = mongoose.model<IPostModelDocument>('Post', PostModelSchema);
