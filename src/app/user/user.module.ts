import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import { UserRootComponent } from './user-root.component';
import {RouterModule} from '@angular/router';
import {userModuleRoutes} from './user-routings';
import {DataTablesModule} from 'angular-datatables';
import { UserSettingsMainComponent } from './user-settings-main/user-settings-main.component';
import { UserSettingsCompanyComponent } from './user-settings-company/user-settings-company.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    UserRootComponent,
    UserSettingsMainComponent,
    UserSettingsCompanyComponent
  ],
  exports: [
    DashboardComponent,
    UserSettingsMainComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(userModuleRoutes)
  ]
})
export class UserModule { }
