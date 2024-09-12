import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  appointments: any[] = [
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00 AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 2, patientName: 'Jane Doe', doctorName: 'Dr. Adams', time: '11:00 AM', status: 'Pending', day: 'Tuesday', date: '2024-09-10' },
  ];

  ngOnInit(): void {}

  addAppointment() {
    alert('Add Appointment functionality to be implemented');
  }
  editAppointment(appointment: any ) {
    alert('Edit Appointment functionality to be implemented');
  }
  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(app => app.id !== id);
    alert('Appointment deleted');
  }

}
