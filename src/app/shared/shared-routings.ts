import {Routes} from '@angular/router';
import {UserDashboardComponent} from '../user/user-dashboard/user-dashboard.component';
import {UserSettingsComponent} from '../user/user-settings/user-settings.component';
import {ClientsComponent} from '../user/clients/clients.component';
import {UserAuthGuard} from './guard/UserAuthGuard';
import {InvoicesComponent} from '../user/invoices/invoices.component';

export const sharedModuleRoutes: Routes = [
  {
    path: 'user/clients',
    component: ClientsComponent,
    pathMatch: 'full',
    canActivate: [UserAuthGuard]
  },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [UserAuthGuard]
  },
  {
    path: 'user/settings',
    component: UserSettingsComponent,
    pathMatch: 'full',
    canActivate: [UserAuthGuard]
  },
  {
    path: 'user/invoices',
    component: InvoicesComponent,
    pathMatch: 'full',
    canActivate: [UserAuthGuard]
  }
];
