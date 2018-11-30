import {Routes} from '@angular/router';
import {UserRootComponent} from './user-root.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {ClientsComponent} from './clients/clients.component';
import {ClientNewComponent} from './client-new/client-new.component';

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
        path: 'settings',
        component: UserSettingsComponent,
        pathMatch: 'full'
      },
      {
        path: 'clients',
        component: ClientsComponent,
        pathMatch: 'full'
      },
      {
        path: 'clients/new',
        component: ClientNewComponent,
        pathMatch: 'full'
      }
    ]
  }
];
