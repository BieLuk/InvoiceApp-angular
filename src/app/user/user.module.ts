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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClientsComponent } from './clients/clients.component';
import {ClientNewComponent} from './client-new/client-new.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { InvoicesComponent } from './invoices/invoices.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent,
    UserRootComponent,
    UserSettingsComponent,
    ClientsComponent,
    ClientNewComponent,
    ClientEditComponent,
    InvoicesComponent,
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
    ReactiveFormsModule,
    RouterModule.forChild(userModuleRoutes)
  ]
})
export class UserModule { }
