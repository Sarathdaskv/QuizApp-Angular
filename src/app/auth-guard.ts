import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthServiceService } from "./service/auth-service.service";

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private route:Router,private auth:AuthServiceService){}

    canActivate():boolean {
        const userData=this.auth.getUserData();
        if (this.auth.checkAuthStatus()) {
            this.route.navigate(['/user', userData._id])
            return false;
          }
          return true;
        }
    }
