import {Routes} from '@angular/router';
import {UserRootComponent} from './user-root.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {UserSettingsMainComponent} from './user-settings-main/user-settings-main.component';

export const userModuleRoutes: Routes = [
  {
    path: 'user',
    component: UserRootComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'

      },
      {
        path: 'heroes',
        component: HeroesComponent,
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserSettingsMainComponent,
        pathMatch: 'full'
      }
    ]
  }
];
