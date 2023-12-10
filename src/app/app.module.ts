import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './routingModule'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/addUser/addUser.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ShopsComponent } from './components/shops/shops.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SideBarComponent,
    HomeComponent,
    UserManagementComponent,
    ShopsComponent,
    AppointmentsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService,
    CookieService,
    AuthGuard,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
