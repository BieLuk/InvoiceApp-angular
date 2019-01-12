import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRootComponent } from './admin-root.component';
import {RouterModule} from '@angular/router';
import {adminModuleRoutes} from './admin-routings';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminRootComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminModuleRoutes)

  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }

