import {Routes} from '@angular/router';
import {UserRootComponent} from './user-root.component';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {ClientsComponent} from './clients/clients.component';
import {ClientNewComponent} from './client-new/client-new.component';
import {UserAuthGuard} from '../shared/guard/UserAuthGuard';
import {ClientEditComponent} from './client-edit/client-edit.component';
import {InvoicesComponent} from './invoices/invoices.component';
import {InvoiceNewComponent} from './invoice-new/invoice-new.component';
import {InvoiceDetailsComponent} from './invoice-details/invoice-details.component';
import {AdminAuthGuard} from '../shared/guard/AdminAuthGuard';
import {InvoiceEditComponent} from './invoice-edit/invoice-edit.component';

export const userModuleRoutes: Routes = [
  {
    path: 'user',
    component: UserRootComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard, AdminAuthGuard]
      },
      {
        path: 'settings',
        component: UserSettingsComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'invoices/new',
        component: InvoiceNewComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'invoices/edit',
        component: InvoiceEditComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'invoices/details',
        component: InvoiceDetailsComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'clients',
        component: ClientsComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'clients/new',
        component: ClientNewComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      },
      {
        path: 'clients/edit',
        component: ClientEditComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard]
      }
    ]
  }
];
