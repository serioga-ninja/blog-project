import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersApiService} from './services/users-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    UsersApiService
  ]
})
export class UsersModule {
}
