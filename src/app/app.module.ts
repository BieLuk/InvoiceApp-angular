import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from './shared/shared.module';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';
import {RouterModule} from '@angular/router';
import { ClientNewComponent } from './user/client-new/client-new.component';
import { RegisterComponent } from './shared/component/register/register.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './shared/helpers/JwtInterceptor';
import {ErrorInterceptor} from './shared/helpers/ErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    NgbModule,
    SharedModule,
    UserModule,
    AdminModule,
    RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
