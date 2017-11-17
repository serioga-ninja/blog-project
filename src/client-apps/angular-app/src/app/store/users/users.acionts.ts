import {IUserModel} from '../../../../../../server/interfaces/i-user-model';

const usersReducerActions = {
  LOAD_USERS: 'LOAD_USERS',
  LOAD_USERS_SUCCESS: 'LOAD_USERS_SUCCESS',
  LOAD_USERS_ERROR: 'LOAD_USERS_ERROR',

  LOAD_USER: 'LOAD_USER',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_ERROR: 'LOAD_USER_ERROR',

  CREATE_USER: 'CREATE_USER',
};

export let loadUsers = () => ({type: usersReducerActions.LOAD_USERS});
export let loadUsersError = () => ({type: usersReducerActions.LOAD_USERS_ERROR});
export let loadUsersSuccess = (users: IUserModel[]) => ({type: usersReducerActions.LOAD_USERS_SUCCESS, users: users});

export let loadUser = (userId: string) => ({type: usersReducerActions.LOAD_USER, userId: userId});
export let loadUserSuccess = (user: IUserModel) => ({type: usersReducerActions.LOAD_USER_SUCCESS, user});
export let loadUserError = () => ({type: usersReducerActions.LOAD_USER_ERROR});

export default usersReducerActions;
