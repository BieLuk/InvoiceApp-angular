import {Routes} from '@angular/router';
import {HeroesComponent} from '../user/heroes/heroes.component';
import {DashboardComponent} from '../user/dashboard/dashboard.component';
import {UserSettingsComponent} from '../user/user-settings/user-settings.component';

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
    path: 'user/settings',
    component: UserSettingsComponent,
    pathMatch: 'full'
  }
];
