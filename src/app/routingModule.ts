
import { NgModule } from "@angular/core"; 
import { RouterModule, Routes } from "@angular/router"; 
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";

const routes: Routes = [
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
        path: "**",
        redirectTo: "/auth/login",
        pathMatch:"full",
    }, 
]; 
  
@NgModule({ 
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule], 
}) 
export class RoutingModule {}