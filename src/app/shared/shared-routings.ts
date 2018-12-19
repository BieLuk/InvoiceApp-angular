import {Routes} from '@angular/router';
import {DashboardComponent} from '../user/dashboard/dashboard.component';
import {UserSettingsComponent} from '../user/user-settings/user-settings.component';
import {ClientsComponent} from '../user/clients/clients.component';
import {HeroesComponent} from '../user/heroes/heroes.component';
import {LoginComponent} from './component/login/login.component';
import {AuthGuard} from './guard/AuthGuard';
import {InvoicesComponent} from '../user/invoices/invoices.component';

export const sharedModuleRoutes: Routes = [
  {
    path: 'user/clients',
    component: ClientsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'user/settings',
    component: UserSettingsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'user/invoices',
    component: InvoicesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];
