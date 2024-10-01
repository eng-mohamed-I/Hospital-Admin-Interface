import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl = 'http://localhost:5000/api/report/';
  constructor(private _http: HttpClient) {}

  createReport(report: any): Observable<any> {
    return this._http.post(`${this.baseUrl}create`, report);
  }

  getReports(): Observable<any> {
    return this._http.get(this.baseUrl);
  }

  getAppointmentRrports(id: any): Observable<any> {
    return this._http.get(`${this.baseUrl}appointment/${id}`)
  }

  getAppointmentDetails(appointmentID: string): Observable<any> {
    return this._http.get(`http://localhost:5000/api/appointments/${appointmentID}`);
  }
}
