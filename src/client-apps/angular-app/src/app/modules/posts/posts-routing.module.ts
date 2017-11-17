import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogListComponent} from './components/posts-list/posts-list.component';
import {NewPostComponent} from './components/new-post/new-post.component';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent
  },
  {
    path: 'new',
    component: NewPostComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BlogRoutingModule {
}
