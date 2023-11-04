import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthServiceService } from "./service/auth-service.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

constructor(private auth:AuthServiceService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
        const authToken=this.auth.getToken();
        const authRequest=req.clone({
            headers:req.headers.set('authorization',"Bearer "+authToken)
        })
        return next.handle(authRequest);
    }
}