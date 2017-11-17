import {Component, OnInit} from '@angular/core';
import {IUsersReducerState} from '../../store/users/users.reducer';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {IRootReducer} from '../../interfaces/i-root-reducer';
import {loadUser} from '../../store/users/users.acionts';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  public usersStore$: Observable<IUsersReducerState>;

  constructor(private store: Store<IRootReducer>) {
    this.usersStore$ = store.select('users');

    this.usersStore$.subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    this.store.dispatch(loadUser('5a0ee6d50b46560eacde91b2'));
  }
}
