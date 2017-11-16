import {CrudController} from '../classes/crud-controller';
import * as mongoose from 'mongoose';
import {IPostModelDocument, PostModel} from '../models/post.model';
import {IPostModel} from '../interfaces/i-post-model';

class PostController extends CrudController<IPostModel> {
  urlPart: string = 'posts';
  idAttribute: string = '_id';
  model: mongoose.Model<IPostModelDocument> = PostModel;
}

let postController = new PostController();
postController.init();

export default postController.router;
