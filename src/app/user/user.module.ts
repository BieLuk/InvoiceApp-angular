import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';
import { UserRootComponent } from './user-root.component';
import {RouterModule} from '@angular/router';
import {userModuleRoutes} from './user-routings';
import {DataTablesModule} from 'angular-datatables';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    UserRootComponent,
    UserSettingsComponent
  ],
  exports: [
    DashboardComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(userModuleRoutes)
  ]
})
export class UserModule { }
