import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminLoginService } from '../admin/admin-login.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = 'http://localhost:5000/api/departments';
  constructor(
    private http: HttpClient,
    private _authService: AdminLoginService
  ) {}

  addDepartment(departmentData: any): Observable<any> {
    let token = this._authService.getToken();
    if (!token) {
      console.log('Error token');
    }
    console.log('added');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this._authService.getToken(),
      }),
    };
    return this.http.post<any>(
      `${this.baseUrl}/create`,
      departmentData,
      httpOptions
    );
  }

  deleteDepartment(departmentId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this._authService.getToken(),
      }),
    };
    return this.http.delete<any>(
      `${this.baseUrl}/${departmentId}`,
      httpOptions
    );
  }

  getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }

  getDapartmentById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateDepartment(id: any, department: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this._authService.getToken(),
      }),
    };
    return this.http.put<any>(`${this.baseUrl}/${id}`, department, httpOptions);
  }

  getDoctors(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/doctors/');
  }

  getDepartmentDoctors(id: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:5000/api/doctors/department/${id}`
    );
  }
}
