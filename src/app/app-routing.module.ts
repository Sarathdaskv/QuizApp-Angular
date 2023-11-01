import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'login', component:UserLoginComponent},
  {path:'admin', component:AdminLoginComponent},
  {path:'', component:UserLoginComponent},
  {path:'user', component:UserComponent},
  { path: '**', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
