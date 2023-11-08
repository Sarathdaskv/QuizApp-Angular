import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { UserComponent } from './user/user.component';
import ActivateGuard from './activate-guard';
import { AuthGuard } from './auth-guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {path:'user', component:UserLoginComponent, canActivate: [AuthGuard]},
  {path:'admin', component:AdminLoginComponent},
  {path:'admin/:adminId', component:AdminDashboardComponent,canActivate: [ActivateGuard]},
  { path: '',   redirectTo: '/user', pathMatch: 'full' },
  {path:'user/:userId', component:UserComponent,canActivate: [ActivateGuard]},
  { path: '**', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
