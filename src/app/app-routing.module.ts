import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import { SingleUserComponent } from './single-user/single-user.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'products/:id', component: SingleUserComponent },
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**',redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
