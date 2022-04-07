import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdmindashboardComponent} from "./admindashboard.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  { path:'', component:AdmindashboardComponent},
  { path:'/users', component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
