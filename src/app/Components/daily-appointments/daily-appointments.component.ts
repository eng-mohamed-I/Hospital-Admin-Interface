import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  time: string;
  status: string;
  day: string;  
  date: string;  
}

@Component({
  selector: 'app-daily-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-appointments.component.html',
  styleUrls: ['./daily-appointments.component.css']
})
export class DailyAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00 AM', status: 'Confirmed', day: 'Monday', date: '2024-09-09' },
    { id: 2, patientName: 'Jane Doe', doctorName: 'Dr. Adams', time: '11:00 AM', status: 'Pending', day: 'Tuesday', date: '2024-09-10' },
  ];

  constructor() {}

  ngOnInit(): void {}

  addAppointment() {
    alert('Add Appointment functionality to be implemented');
  }
  editAppointment(appointment: Appointment) {
    alert('Edit Appointment functionality to be implemented');
  }
  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(app => app.id !== id);
    alert('Appointment deleted');
  }
}
