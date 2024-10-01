import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = 'http://localhost:5000/api/departments';

  constructor(private http: HttpClient) {}

  addDepartment(departmentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, departmentData);
  }

  deleteDepartment(departmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${departmentId}`);
  }

  getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }

  getDapartmentById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  updateDepartment(id: any, department: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, department);
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
