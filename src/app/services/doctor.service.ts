import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5000/api/doctors'; 

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  addDoctor(formData: FormData): Observable<any> {
    return this.http.post('/api/doctors', formData, {
      headers: {
        // Do not set 'Content-Type', the browser will set it automatically to 'multipart/form-data'
      }
    });
  }
  
  updateDoctor(id: string, formData: FormData): Observable<any> {
    return this.http.put(`/api/doctors/${id}`, formData, {
      headers: {
        // Do not set 'Content-Type', the browser will set it automatically to 'multipart/form-data'
      }
    });
  }

  deleteDoctor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
