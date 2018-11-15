import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import { UserRootComponent } from './user-root.component';
import {RouterModule} from '@angular/router';
import {userModuleRoutes} from './user-routings';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    UserRootComponent
  ],
  exports: [
    DashboardComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(userModuleRoutes)
  ]
})
export class UserModule { }
