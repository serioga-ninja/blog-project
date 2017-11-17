import {Action} from '@ngrx/store';
import {IPostModel} from '../../../../../../server/interfaces/i-post-model';
import postReducerActions from './posts.actions';
import {IReducersList} from '../../interfaces/i-reducers-list';

export interface IPostReducerState {
  posts: IPostModel[];
  post: IPostModel;
}

interface IPostReducerAction extends IPostReducerState, Action {
}

const BASE_STATE: IPostReducerState = {
  posts: [],
  post: <IPostModel>{}
};

const PostsReducers: IReducersList<IPostReducerState, IPostReducerAction> = {

  [postReducerActions.LOAD_POSTS_SUCCESS]: (state: IPostReducerState, action: IPostReducerAction): IPostReducerState => ({...state, ...{posts: [...action.posts]}}),

  [postReducerActions.CREATE_POST_SUCCESS]: (state: IPostReducerState, action: IPostReducerAction): IPostReducerState => ({...state, ...{post: {...action.post}}})

};

export default function postsReducer(state: IPostReducerState = BASE_STATE, action: IPostReducerAction): IPostReducerState {

  return typeof PostsReducers[action.type] === 'function' ? PostsReducers[action.type](state, action) : state;
}
