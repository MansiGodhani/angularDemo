import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  { path:'', component:LoginComponent },
  // { path:'login/admin', component:LoginComponent },
  { path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard] },
  // { path:'admin/users',component:UsersComponent, canActivate:[AuthGuard]},
  // { path: 'admin/users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule) },
  // { path:'admin/products', component:ProductsComponent, canActivate:[AuthGuard]},
  { path: 'admin/products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule), canActivate:[AuthGuard] },
  { path: 'admin/users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule), canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
