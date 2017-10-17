import * as mongoose from 'mongoose';
import {createHash} from '../helpers/auth';

let Schema = mongoose.Schema,
  validators = require('mongoose-validators');

export interface IUserModel {
  id?: string;
  provider: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUserModel, mongoose.Document {
}

export let UserModelSchema: mongoose.Schema = new Schema({
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
  let self = this.toObject();
  if (self.password) {
    this.password = createHash(self.password);
  }
  next();
});

export let UserModel = mongoose.model<IUserDocument>('User', UserModelSchema);
