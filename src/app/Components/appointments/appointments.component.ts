import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentsService } from '../../services/appointments/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  todayAppointments: Appointment[] = [];
  appointments: Appointment[] = []; // Ensure this is an array
  filteredAppointments: Appointment[] = [];
  searchTerm: string = '';
  departments: any[] = [];
  selectedDepartment: string = '';
  addReportEnabled: boolean = false;

  constructor(
    private appointmentService: AppointmentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
    this.getTodaysAppointments();
  }

  getTodaysAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (data: { appointments: Appointment[] }) => {
        const today = new Date();
        this.todayAppointments = data.appointments.filter(
          (appointment: Appointment) => {
            const appointmentDate = new Date(appointment.date);
            return (
              appointmentDate.getFullYear() === today.getFullYear() &&
              appointmentDate.getMonth() === today.getMonth() &&
              appointmentDate.getDate() === today.getDate()
            );
          }
        );
      },
      (error) => {
        console.error("Error fetching today's appointments:", error);
      }
    );
  }

  getAllAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (data: { appointments: Appointment[] }) => {
        this.appointments = data.appointments;
        this.filteredAppointments = this.appointments;
        this.getDepartments();
      },
      (error) => {
        console.error('Error fetching all appointments:', error);
      }
    );
  }

  getDepartments(): void {
    const uniqueDepartments = new Set(
      this.appointments.map((a) => a.department)
    );
    this.departments = Array.from(uniqueDepartments);
  }

  filterAppointments(): void {
    this.filteredAppointments = this.appointments.filter((appointment) => {
      const matchesDepartment = this.selectedDepartment
        ? appointment.department === this.selectedDepartment
        : true;

      const matchesSearchTerm = this.searchTerm
        ? appointment?.patientID?.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          appointment.doctorID.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      return matchesDepartment && matchesSearchTerm;
    });
  }

  editAppointment(appointment: any): void {
    this.appointmentService
      .updateAppointmentStatus(appointment._id, 'completed')
      .subscribe(
        (response) => {
          console.log('Appointment updated:', response);
          this.addReportEnabled = true;
          appointment.status = 'completed';
          this.getAllAppointments();
        },
        (error) => {
          console.error('Error updating appointment:', error);
        }
      );
  }

  deleteAppointment(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.appointmentService.cancelAppointment(id).subscribe(
          () => {
            this.getAllAppointments(); // Refresh appointments list after deletion
          },
          (error) => {
            console.error('Failed to delete appointment', error);
          }
        );
      }
    });
  }
}
