import {IPostModel} from '../../../../../../server/interfaces/i-post-model';

const postReducerActions = {
  LOAD_POSTS: 'LOAD_POSTS',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
  LOAD_POSTS_ERROR: 'LOAD_POSTS_ERROR',

  CREATE_POST: 'CREATE_POST',
  CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'CREATE_POST_ERROR',
};

export let loadPosts = () => ({type: postReducerActions.LOAD_POSTS});
export let loadPostsError = () => ({type: postReducerActions.LOAD_POSTS_ERROR});
export let loadPostsSuccess = (posts: IPostModel[]) => ({type: postReducerActions.LOAD_POSTS_SUCCESS, posts});

export let createPost = (form: any) => ({type: postReducerActions.CREATE_POST, form});
export let createPostError = () => ({type: postReducerActions.CREATE_POST_ERROR});
export let createPostSuccess = (post: IPostModel) => ({type: postReducerActions.CREATE_POST_SUCCESS, post});

export default postReducerActions;
