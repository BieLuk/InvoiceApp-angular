import {Routes} from '@angular/router';
import {AdminAuthGuard} from '../shared/guard/AdminAuthGuard';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminRootComponent} from './admin-root.component';
import {InvoiceDetailsComponent} from '../user/invoice-details/invoice-details.component';

export const adminModuleRoutes: Routes = [
  {
    path: 'admin',
    component: AdminRootComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        pathMatch: 'full',
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'invoices/details',
        component: InvoiceDetailsComponent,
        pathMatch: 'full',
        canActivate: [AdminAuthGuard]
      }
    ]
  }
];
