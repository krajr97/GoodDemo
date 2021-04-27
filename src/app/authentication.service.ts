import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userAuthenticated = new BehaviorSubject(null);

  constructor(private http : HttpClient) { }

  setProfile(profile:any) {
    localStorage.setItem('username', profile?.fullName);
  }

  getProfile() {
    return localStorage.getItem('username');
  }

  setToken(token : string) {
    localStorage.setItem('token',token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  UserSignUp(obj : any) {
    return this.http.post('http://3.0.102.61:3002/api/v2/user/userSignUp', obj, httpOptions);
  }

  authListener() {
    if(this.getToken() !== null) {
      this.userAuthenticated.next(true);
      return this.userAuthenticated.asObservable();
    } else {
      this.userAuthenticated.next(false);
      return this.userAuthenticated.asObservable();
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

}
