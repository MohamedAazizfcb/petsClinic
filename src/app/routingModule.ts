
import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from "@angular/router"; 
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/addUser/addUser.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./auth.guard";
import { UserManagementComponent } from "./components/user-management/user-management.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AppointmentsComponent } from "./components/appointments/appointments.component";
import { ShopsComponent } from "./components/shops/shops.component";

const routes: Routes = [
    { 
        path: "",
        redirectTo: "/home",
        pathMatch: 'full',
    }, 
    { 
        path: "auth/signup",
        component: SignupComponent,
        canActivate:[],
    }, 
    { 
        path: "auth/login",
        component: LoginComponent,
        canActivate:[],
    }, 
    { 
        path: "home",
        component: HomeComponent,
        canActivate:[AuthGuard],
    }, 
    { 
        path: "users/manage",
        component: UserManagementComponent,
        canActivate:[AuthGuard],
    }, 
    { 
        path: "shops",
        component: ShopsComponent,
        canActivate:[AuthGuard],
    }, 
    { 
        path: "appointments",
        component: AppointmentsComponent,
        canActivate:[AuthGuard],
    }, 
    { 
        path: "dashboard",
        component: DashboardComponent,
        canActivate:[AuthGuard],
    }, 
    { 
        path: "**",
        redirectTo: "/home",
        pathMatch:"full",
    }, 
]; 
  
@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
}) 
export class RoutingModule {}