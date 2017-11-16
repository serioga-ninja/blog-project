import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogListComponent} from './components/blog-list/blog-list.component';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogApiService} from './services/blog-api.service';
import {HttpModule} from '@angular/http';
import {SharedModule} from '../shared/shared.module';
import {NewPostComponent} from './components/new-post/new-post.component';
import {NgForm, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  declarations: [BlogListComponent, NewPostComponent],
  providers: [
    BlogApiService
  ]
})
export class BlogModule {
}
