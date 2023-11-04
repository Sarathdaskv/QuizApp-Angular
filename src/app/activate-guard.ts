import { CanActivate, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export default class ActivateGuard implements CanActivate {
constructor(private route:Router){}

  private can: boolean = false;
  
  canActivate() {
   // console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (!this.can) {
     this.route.navigate(['/'])
      return false;
    }

    return true;
  }

  setCanActivate(can: boolean) {
    this.can = can;
  }
}