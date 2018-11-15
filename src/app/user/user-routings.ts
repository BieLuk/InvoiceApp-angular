import {Routes} from '@angular/router';
import {UserRootComponent} from './user-root.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';

export const userModuleRoutes: Routes = [
  {
    path: 'user',
    component: UserRootComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'

      },
      {
        path: 'heroes',
        component: HeroesComponent,
        pathMatch: 'full'

      }
    ]
  }
];
