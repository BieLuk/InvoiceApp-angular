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
import { ClientsComponent } from './clients/clients.component';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    UserRootComponent,
    UserSettingsComponent,
    ClientsComponent
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
    MatTableModule,
    RouterModule.forChild(userModuleRoutes)
  ]
})
export class UserModule { }
