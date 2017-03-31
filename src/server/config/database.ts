import * as mongoose from "mongoose";
import {environment} from './environment';

mongoose.connect('mongodb://' + [environment.DB_HOST, environment.DB_NAME].join('/'));

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected!');
});
