import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRootComponent } from './admin-root.component';
import {RouterModule} from '@angular/router';
import {adminModuleRoutes} from './admin-routings';
import { UsersComponent } from './users/users.component';
import {DataTablesModule} from 'angular-datatables';
import { InvoicesComponent } from './invoices/invoices.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminRootComponent,
    UsersComponent,
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(adminModuleRoutes)

  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }

