import {Routes} from '@angular/router';
import {UserRootComponent} from './user-root.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {ClientsComponent} from './clients/clients.component';
import {ClientNewComponent} from './client-new/client-new.component';
import {AuthGuard} from '../shared/guard/AuthGuard';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {InvoicesComponent} from './invoices/invoices.component';

export const userModuleRoutes: Routes = [
  {
    path: 'user',
    component: UserRootComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'clients',
        component: ClientsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'clients/new',
        component: ClientNewComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'clients/edit',
        component: ClientEditComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
    ]
  }
];
