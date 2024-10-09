import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { auto } from '@popperjs/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  user: BehaviorSubject<boolean>;
  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.user = new BehaviorSubject<boolean>(this.isUserLogedIn);
  }

  login(user: any): Observable<any> {
    return this._http.post('http://localhost:5000/api/users/login', user);
  }

  getToken() {
    if (this.user) {
      if (isPlatformBrowser(this._platformId)) {
        let data: any = localStorage.getItem('auth');
        data = data ? JSON.parse(data) : '';
        return data?.token;
      }
    }
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
