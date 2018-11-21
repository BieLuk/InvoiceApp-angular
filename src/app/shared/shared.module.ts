import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './component/navbar/navbar.component';
import {LoginComponent} from './component/login/login.component';
import {RouterModule} from '@angular/router';
import {sharedModuleRoutes} from './shared-routings';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent
  ],
  exports: [
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(sharedModuleRoutes)

  ]
})
export class SharedModule { }
