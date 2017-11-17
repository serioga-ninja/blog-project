import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogListComponent} from './components/posts-list/posts-list.component';
import {BlogRoutingModule} from './posts-routing.module';
import {BlogApiService} from './services/posts-api.service';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../shared/shared.module';
import {NewPostComponent} from './components/new-post/new-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import postsReducer from '../../store/posts/posts.reducer';

@NgModule({
  imports: [
    EffectsModule.forRoot([BlogApiService]),
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    StoreModule.forFeature('posts', postsReducer)
  ],
  declarations: [BlogListComponent, NewPostComponent],
  providers: [
    BlogApiService
  ]
})
export class BlogModule {
}
