import {Routes} from '@angular/router';
import {DashboardComponent} from '../user/dashboard/dashboard.component';
import {UserSettingsComponent} from '../user/user-settings/user-settings.component';
import {ClientsComponent} from '../user/clients/clients.component';
import {HeroesComponent} from '../user/heroes/heroes.component';
import {LoginComponent} from './component/login/login.component';

export const sharedModuleRoutes: Routes = [
  {
    path: 'user/clients',
    component: ClientsComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/settings',
    component: UserSettingsComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/invoices',
    component: HeroesComponent,
    pathMatch: 'full'
  }
];
