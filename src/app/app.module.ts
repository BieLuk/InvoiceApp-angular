import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './component/heroes/heroes.component';
import { FormsModule} from '@angular/forms';
import { HeroDetailComponent } from './component/hero-detail/hero-detail.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AppBootstrapModule } from './app-bootstrap.module';
import { AppConstantsModule } from './app-constants-module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './component/footer/footer.component';
import {DataTablesModule} from 'angular-datatables';
import { LoginComponent } from './component/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppConstantsModule,
    AppBootstrapModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  isLoggedIn = 0;
}
