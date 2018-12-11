import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './shared/component/login/login.component';
import {DashboardComponent} from './user/dashboard/dashboard.component';
import {AuthGuard} from './shared/guard/AuthGuard';

export const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

