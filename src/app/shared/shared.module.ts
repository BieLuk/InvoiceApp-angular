import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './component/navbar/navbar.component';
import {LoginComponent} from './component/login/login.component';
import {RouterModule} from '@angular/router';
import {sharedModuleRoutes} from './shared-routings';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './component/alert/alert.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(sharedModuleRoutes)

  ]
})
export class SharedModule { }
