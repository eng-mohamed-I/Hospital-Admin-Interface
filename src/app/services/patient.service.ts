import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:5000/api/patient'; 

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<{data:Patient[]}> {
    return this.http.get<{ data: Patient[] }>(this.apiUrl);
  }

  getPatientById(id: string): Observable<{data:Patient}> {
    return this.http.get<{data:Patient}>(`${this.apiUrl}/${id}`);
  }

  // Add a new patient
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/signup`, patient);
  }

  // Update an existing patient
  updatePatient(id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  // Delete a patient
  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
