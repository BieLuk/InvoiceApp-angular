import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './shared/component/login/login.component';
import {RegisterComponent} from './shared/component/register/register.component';
import {SharedDashboardComponent} from './shared/component/shared-dashboard/shared-dashboard.component';
import {SharedAuthGuard} from './shared/guard/SharedAuthGuard';

export const routes: Routes = [
  { path: '',
    component: SharedDashboardComponent,
    canActivate: [SharedAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

