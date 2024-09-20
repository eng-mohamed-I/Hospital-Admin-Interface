import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:5000/api/departments';

  constructor(private http: HttpClient) { }

  addDepartment(departmentData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, departmentData);
  }

  deleteDepartment(departmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/get-one/${departmentId}`);
  }
  getDepartments(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-all`);
  }
}
