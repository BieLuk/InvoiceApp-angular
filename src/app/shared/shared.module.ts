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
import { SharedDashboardComponent } from './component/shared-dashboard/shared-dashboard.component';
import {UserModule} from '../user/user.module';
import {AdminModule} from '../admin/admin.module';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SharedDashboardComponent
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SharedDashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    AdminModule,
    RouterModule.forChild(sharedModuleRoutes)

  ]
})
export class SharedModule { }
