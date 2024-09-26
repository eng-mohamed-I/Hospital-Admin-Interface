import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator
import { Appointment } from '../../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private baseUrl = 'http://localhost:5000/api/appointments'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Get appointment details by ID
  getAppointmentDetails(appointmentID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${appointmentID}`);
  }

  // Book a new appointment
  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post(this.baseUrl, appointmentData);
  }

  // Update the status of an appointment
  updateAppointmentStatus(
    appointmentID: string,
    status: string
  ): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${appointmentID}/status`, {
      status,
    });
  }

  // Get appointments by patient email
  getAppointmentsByPatientEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${email}`);
  }

  // Add report to an appointment
  addReportToAppointment(appointmentID: string, report: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${appointmentID}/report`, report);
  }

  // Get all appointments
  getAllAppointments(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Cancel an appointment
  cancelAppointment(appointmentID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cancel/${appointmentID}`);
  }

  getDoctorAppointment(token: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctor/${token}`);
  }

  // Get today's appointments
}
