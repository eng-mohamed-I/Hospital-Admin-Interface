import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments/appointment.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-doctor-appointment',
  standalone: true,
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css'],
  imports: [CommonModule],
})
export class DoctorAppointmentComponent implements OnInit {
  appointments: any[] = [];
  token: string | null = null;

  constructor(
    private _appointmentService: AppointmentsService,
    public dialoag: MatDialog
  ) {
    this.token = localStorage.getItem('auth');
  }

  ngOnInit(): void {
    if (this.token) {
      this.token = JSON.parse(this.token).token;

      this.loadAppointments();
    } else {
      console.error('No auth token found');
    }
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
