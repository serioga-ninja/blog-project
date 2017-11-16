import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppMaterialModule} from './material/app.material.module';


@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AppMaterialModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    }
  }
}

