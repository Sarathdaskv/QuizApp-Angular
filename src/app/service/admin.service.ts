import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthData } from '../auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private token!: string;
  private tokenTimer!: any;
  private messageSubject = new Subject<string>()
  public messageSubject$ = this.messageSubject.asObservable();
  private authStatusListner = new Subject<boolean>()
  private isAuth: boolean=false;

  usersUrl = 'database/userCredentials.json';
  adminUrl = 'database/adminCredentials.json'
  userData: any;
  constructor(private http: HttpClient, private router: Router) { }
 
  getToken() {
    return this.token;
  }

  getUserData() {
    return this.userData;
  }
  getAuthStatus() {
    return this.authStatusListner;
  }
  getIsAuth() {
    return this.isAuth;
  }

  putUserLogin(userId: string, userData: any): Observable<any> {
    const updateUserUrl = `${this.usersUrl}/${userId}`;
    return this.http.put<any>(updateUserUrl, this.userData);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  adminLogin(email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    return this.http.post<any>('http://localhost:3000/admin/login', authData).subscribe(response => {
      if (response.message) {
        this.messageSubject.next(response.message)
      } else {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration)
        const data = response.userData;
        this.userData = data;
        const token = response.token;
        this.token = token;
        this.isAuth=true;
        this.authStatusListner.next(true)
        const now = new Date();
        const expDate = new Date(now.getTime() + expiresInDuration * 1000)
        this.saveAuthData(token, expDate)
        console.log(expDate);
        this.router.navigate(['/admin', this.userData._id])
      }
    })

  }
private setAuthTimer(duration:number){
  this.tokenTimer = setTimeout(() => {
    this.logOut();
  }, duration * 1000)
}

  getAdmin(): Observable<any[]> {
    return this.http.get<any[]>(this.adminUrl);
  }

  getLoginUserData(userId: string) {
    return this.http.get<any>(`http://localhost:3000/user/${userId}`);
  }
  getLoginAdminData(adminId: string) {
    return this.http.get<any>(`http://localhost:3000/admin/${adminId}`);
  }
  setLoginUserData(data: any) {
    this.userData = data
  }

  logOut() {
    this.token = '';
    this.isAuth=false;
    this.authStatusListner.next(false)
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/admin'])
  }

  private saveAuthData(token: string, expDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expDate', expDate.toISOString())
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expDate');
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (authInfo?.expDate) {
      const now = new Date();
      const expiresIn = authInfo.expDate.getTime() - now.getTime();
      if(expiresIn>0){
        this.token=authInfo.token;
        this.authStatusListner.next(true);
        this.setAuthTimer(expiresIn/1000)
      }
    } else {
      console.log('Authentication information is missing or invalid.');
    }
  }
  

  getAuthData(){
    const token=localStorage.getItem('token');
    const expDate=localStorage.getItem('expDate');
    if(!token || !expDate){
      return;
    }
    return {
      token:token,
      expDate:new Date(expDate)
    }
  }

  checkAuthStatus(): boolean {
    const authInfo = this.getAuthData();
    if (authInfo?.expDate) {
      const now = new Date();
      return authInfo.expDate.getTime() > now.getTime();
    }
    return false;
  }
}
