import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './component/navbar/navbar.component';
import {LoginComponent} from './component/login/login.component';

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
    CommonModule
  ]
})
export class SharedModule { }
