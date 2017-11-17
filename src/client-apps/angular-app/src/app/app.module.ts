import 'hammerjs';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/shared/material/app.material.module';

import {AppRoutingModule} from './app-routing.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {SharedModule} from './modules/shared/shared.module';
import {BlogModule} from './modules/posts/posts.module';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import {of} from 'rxjs/observable/of';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import rootReducer from './store/rootReducer';
import {UsersModule} from './modules/users/users.module';
import {EffectsModule} from '@ngrx/effects';
import {UsersApiService} from './modules/users/services/users-api.service';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    FlexLayoutModule,
    EffectsModule.forRoot([UsersApiService]),
    UsersModule,
    StoreModule.forRoot(rootReducer),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    BlogModule,
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    UsersApiService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
