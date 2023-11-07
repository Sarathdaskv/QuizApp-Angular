import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { UserComponent } from './user/user.component';
import ActivateGuard from './activate-guard';

const routes: Routes = [
  {path:'user', component:UserLoginComponent},
  {path:'admin', component:AdminLoginComponent},
  { path: '',   redirectTo: '/user', pathMatch: 'full' },
  {path:'user/:userId', component:UserComponent,canActivate: [ActivateGuard]},
  { path: '**', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
