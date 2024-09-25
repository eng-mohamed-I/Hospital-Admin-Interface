import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../../models/doctor.model';
interface PartialDoctorUpdate {
  availableDates: any;
}
@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = 'http://localhost:5000/api/doctors/';

  constructor(private http: HttpClient) {}

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
  updateDoctor(id: string, doctor: Doctor | FormData): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor);
  }
  
  getDoctorByIdForUpdate(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  // delete existing doctor
  deleteDoctor(id: string): Observable<Doctor> {
    return this.http.delete<Doctor>(`${this.apiUrl}/${id}`);
  }

  updateDoctorAvailableDate(id: string, doctor: Doctor | FormData): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/A/${id}`, doctor);
  }
  


  
  // Adjust the method to accept PartialDoctorUpdate
  updateDoctorAvailableDatE(id: string, availableDates: PartialDoctorUpdate): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/A/${id}`, availableDates);
  }
}
