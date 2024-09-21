import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:5000/api/doctors';
  private departmentUrl = 'http://localhost:5000/api/departments';

  constructor(private http: HttpClient) {}

  // Fetch all departments
  getDepartments(): Observable<any> {
    return this.http.get<any>(this.departmentUrl);
  }

  // Get all doctors
  getDoctor(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Add a new doctor (update this method to accept FormData)
  addDoctor(doctor: FormData): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor);
  }

  // Get doctor by ID
  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  // Update existing doctor
  // updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
  //   return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  // }

  deleteDoctor(id: number): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.apiUrl}/${id}`);
  }


}
