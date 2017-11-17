import {Component, OnInit} from '@angular/core';
import {BlogApiService} from '../../services/posts-api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IPostsModuleReducer} from '../../../../interfaces/i-posts-module-reducer';
import {Observable} from 'rxjs/Observable';
import {IPostReducerState} from '../../../../store/posts/posts.reducer';
import {createPost} from '../../../../store/posts/posts.actions';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public postForm: FormGroup;

  constructor(private store: Store<IPostsModuleReducer>) {

    this.postForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      authorId: new FormControl('572630c32310063411d4600e')
    });
  }

  ngOnInit() {
  }

  createPost() {
    return this.store
      .dispatch(createPost(this.postForm.getRawValue()));
  }

}
