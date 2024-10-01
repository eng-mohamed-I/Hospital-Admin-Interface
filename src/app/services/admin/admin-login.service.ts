import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  user: BehaviorSubject<boolean>;
  constructor(private _http: HttpClient) {
    this.user = new BehaviorSubject<boolean>(this.isUserLogedIn);
  }

  login(user: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/users/login', user);
  }

  get isUserLogedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {

    return localStorage.getItem('auth') ? true : false;
    }
      return false;

  }

  getAdminRole() {
    let role: any;
    const isAuth = localStorage.getItem('auth') ? true : false;
    if (isAuth) {
      role = localStorage.getItem('auth');
      role = JSON.parse(role);
      return role.user.role;
    }
  }

  logOut() {
    localStorage.clear();
    this.user.next(false);
  }
}
