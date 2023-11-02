import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

   usersUrl = 'database/userCredentials.json';
   adminUrl='database/adminCredentials.json'

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  getAdmin():Observable<any[]> { 
    return this.http.get<any[]>(this.adminUrl);
  }
}
