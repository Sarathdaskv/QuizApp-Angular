import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthData } from '../auth-data.model';
import { Router } from '@angular/router';
import ActivateGuard from '../activate-guard';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private token!: string;
  private authStatusListner=new Subject<boolean>()

  usersUrl = 'database/userCredentials.json';
  adminUrl = 'database/adminCredentials.json'
  userData: any;
  constructor(private http: HttpClient,private router:Router,private guard: ActivateGuard) { }

getToken(){
  return this.token;
}

getAuthStatus(){
  return this.authStatusListner;
}

  putUserLogin(userId: string, userData: any): Observable<any> {
    const updateUserUrl = `${this.usersUrl}/${userId}`;
    return this.http.put<any>(updateUserUrl, this.userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  userLogin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
   return  this.http.post<{token:string,userData:any}>('http://localhost:3000/login', authData).subscribe(response => {
      const data=response.userData;
      this.userData=data;
        const token=response.token;
        this.token=token;
        this.authStatusListner.next(true)
       // this.guard.setCanActivate(true);
       this.router.navigate(['/user',this.userData._id])
      })

  }

  getAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.adminUrl);
  }

  getLoginUserData(userId:string) {
    return this.http.get<any>(`http://localhost:3000/user/${userId}`);
  }
  setLoginUserData(data: any) {
    this.userData = data
  }

  logOut(){
    this.token='';
    this.authStatusListner.next(true)
  }
}
