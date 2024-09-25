import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorLoginService {
  private apiUrl = 'http://localhost:5000/api/doctors/login';
  private user = new BehaviorSubject<boolean>(this.isUserLogedIn);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Function to login a doctor and save the token upon successful login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap((response) => {
        if (response?.token) {
          // Save token and handle the user status
          this.saveToken(response.token);
        }
      })
    );
  }

  // Save the token to localStorage
  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userToken', token);
      this.user.next(true);
    }
  }

  // Remove the token from localStorage
  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth');
      this.user.next(false);
    }
  }

  // Check if the user is logged in based on the presence of the token
  get isUserLogedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('auth');
    }
    return false;
  }

  // Get the user's role by decoding the token
  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      // const token = localStorage.getItem('userToken');
      // if (token) {
      //   const decodedToken = this.decodeToken(token);
      //   return decodedToken?.role || null;
      // }
      let role: any;
      const isAuth = localStorage.getItem('auth') ? true : false;
      if (isAuth) {
        role = localStorage.getItem('auth');
        role = JSON.parse(role);
        return role.user.role;
      }
    }
    return null;
  }

  // Helper function to decode a JWT token
  public decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  // Get the current user's login status as an Observable
  getUserStatus(): Observable<boolean> {
    return this.user.asObservable();
  }
}
