import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments/appointment.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../services/report/report.service';
import { SrvRecord } from 'dns';

@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css'],
  imports: [CommonModule, RouterLink],
})
export class DoctorAppointmentComponent implements OnInit {
  appointments: any[] = [];
  token: string | null = null;
  reportId: string = '66f369464a5dcbb14133fc3c';
  constructor(
    private _appointmentService: AppointmentsService,
    public dialoag: MatDialog,
    private _reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('auth');
    if (this.token) {
      this.token = JSON.parse(this.token).token;
      this.loadAppointments();
    } else {
      console.error('No auth token found');
    }
    this.loadReports()
  }

  loadReports() {
    this._reportService.getAppointmentRrports(this.reportId).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadAppointments(): void {
    this._appointmentService.getDoctorAppointment(this.token).subscribe(
      (data) => {
        this.appointments = data.appointments.reverse();
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  // confirm
  confirmAppointment(id: any): void {
    this._appointmentService.updateAppointmentStatus(id, 'completed').subscribe(
      (response) => {
        this.loadAppointments();
      },
      (error) => {
        console.error('Error updating appointment:', error);
      }
    );
  }

  //reject
  cancelApppointment(id: any) {
    let dialoag = this.dialoag.open(ConfirmDialogComponent);
    dialoag.afterClosed().subscribe((res) => {
      if (res === true) {
        this._appointmentService.cancelAppointment(id).subscribe(
          (res) => {
            if (res.appointment) {
              this.loadAppointments();
            }
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}
