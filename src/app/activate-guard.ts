import { CanActivate, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './service/auth-service.service';

@Injectable()
export default class ActivateGuard implements CanActivate {
constructor(private route:Router,private auth:AuthServiceService){}

canActivate(): boolean {
  const canActivate = this.auth.checkAuthStatus();
  if (!canActivate) {
    this.route.navigate(['/']);
  }
  return canActivate;
}
}