import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./services/auth.guard";
import {HomeComponent} from "./components/home/home.component";
import {AdmindashboardComponent} from "./components/admindashboard/admindashboard.component";
import {UserdashboardComponent} from "./components/userdashboard/userdashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AdminLoginComponent} from "./components/admin-login/admin-login.component";
import {UsersComponent} from "./components/admindashboard/users/users.component";
import {AddtocartComponent} from "./components/addtocart/addtocart.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  // { path: 'login/admin', component: AdminLoginComponent },
  { path:'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'addToCart', component: AddtocartComponent, canActivate:[AuthGuard] }

  // {
  //   path: 'admin', component: AdmindashboardComponent,
  //   canActivate: [AuthGuard]
  //   // data: {
  //   //   isRole: 'ADMIN'
  //   // }
  // }
  // ,{ path:'admin/users', component:UsersComponent}
  // { path: 'user', component: UserdashboardComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     role: 'ROLE_USER'
  //   }
  // }
  // { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
