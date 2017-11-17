import {Injectable} from '@angular/core';
import {IPostModel} from '../../../../../../../server/interfaces/i-post-model';
import {Http} from '@angular/http';
import {Action, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import postReducerActions, {
  createPostError,
  createPostSuccess, loadPostsError,
  loadPostsSuccess
} from '../../../store/posts/posts.actions';

export interface PostsState {
  posts: IPostModel[];
}

interface ICreatePostAction extends Action {
  form: any;
}

@Injectable()
export class BlogApiService {

  constructor(private http: Http,
              private store: Store<PostsState>,
              private actions$: Actions) {
  }

  @Effect() loadPosts$: Observable<Action> = this.actions$.ofType(postReducerActions.LOAD_POSTS)
    .mergeMap(action => {
      return this.http.get('http://localhost:3000/api/v1/posts/')
        .map(res => res.json() as IPostModel[])
        .map(data => loadPostsSuccess(data))
        // If request fails, dispatch failed action
        .catch(() => of(loadPostsError()))
    });

  @Effect() createPost$: Observable<Action> = this.actions$
    .ofType(postReducerActions.CREATE_POST)
    .mergeMap((action: ICreatePostAction) => {
      return this.http
        .post('http://localhost:3000/api/v1/posts/', action.form)
        .map(res => res.json() as IPostModel)
        .map(data => createPostSuccess(data))
        .catch(() => of(createPostError()))
    });
}
