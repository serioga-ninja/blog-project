import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IPostReducerState} from '../../../../store/posts/posts.reducer';
import {loadPosts} from '../../../../store/posts/posts.actions';
import {IPostsModuleReducer} from '../../../../interfaces/i-posts-module-reducer';

@Component({
  selector: 'app-blog-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class BlogListComponent implements OnInit {

  public postsObject$: Observable<IPostReducerState>;

  constructor(private store: Store<IPostsModuleReducer>) {
    this.postsObject$ = store.select('posts');

    this.postsObject$.subscribe(data => {
      console.log(data, 'posts');
    })
  }

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

}
