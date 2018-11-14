import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroesComponent} from './heroes/heroes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeroesComponent
  ],
  exports: [
    DashboardComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
