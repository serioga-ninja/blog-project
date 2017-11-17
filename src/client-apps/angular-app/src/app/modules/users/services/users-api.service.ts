import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import usersReducerActions, {loadUserError, loadUserSuccess} from '../../../store/users/users.acionts';
import {IUserModel} from '../../../../../../../server/interfaces/i-user-model';
import {of} from 'rxjs/observable/of';

interface ICreateUserAction extends Action {
  userId: string;
}

@Injectable()
export class UsersApiService {

  constructor(private http: Http,
              private actions$: Actions) {
  }

  @Effect() loadUser$: Observable<Action> = this.actions$.ofType(usersReducerActions.LOAD_USER)
    .mergeMap((action: ICreateUserAction) => {
      return this.http.get(`http://localhost:3000/api/v1/users/${action.userId}`)
        .map(res => res.json() as IUserModel)
        .map(data => loadUserSuccess(data))
        .catch(() => of(loadUserError()))
    });


}
