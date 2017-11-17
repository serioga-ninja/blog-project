import {Action} from '@ngrx/store';
import {IPostModel} from '../../../../../../server/interfaces/i-post-model';

import {IReducersList} from '../../interfaces/i-reducers-list';
import usersReducerActions from './users.acionts';
import {IUserModel} from '../../../../../../server/interfaces/i-user-model';

export interface IUsersReducerState {
  users?: IPostModel[];
  user?: IUserModel;
}

interface IUserReducerAction extends IUsersReducerState, Action {
}

const BASE_STATE: IUsersReducerState = {
  users: [],
  user: <IUserModel>{}
};

const UsersReducer: IReducersList<IUsersReducerState, IUserReducerAction> = {

  [usersReducerActions.LOAD_USERS_SUCCESS]: (state: IUsersReducerState, action: IUserReducerAction): IUsersReducerState => ({...state, ...{users: [...action.users]}}),

  [usersReducerActions.LOAD_USER_SUCCESS]: (state: IUsersReducerState, action: IUserReducerAction): IUsersReducerState => ({...state, ...{user: {...action.user}}})

};

export default function usersReducer(state: IUsersReducerState = BASE_STATE, action: IUserReducerAction): IUsersReducerState {

  return typeof UsersReducer[action.type] === 'function' ? UsersReducer[action.type](state, action) : state;
}
