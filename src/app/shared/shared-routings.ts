import {Routes} from '@angular/router';
import {HeroesComponent} from '../user/heroes/heroes.component';
import {DashboardComponent} from '../user/dashboard/dashboard.component';
import {UserSettingsMainComponent} from '../user/user-settings-main/user-settings-main.component';
import {UserSettingsCompanyComponent} from '../user/user-settings-company/user-settings-company.component';

export const sharedModuleRoutes: Routes = [
  {
    path: 'user/heroes',
    component: HeroesComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/settings/profile',
    component: UserSettingsMainComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/settings/company',
    component: UserSettingsCompanyComponent,
    pathMatch: 'full'
  }
];
