import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css'
})
export class PatientsTableComponent {
  patients: Array<{ id: number, name: string, gender: string, age: number, admittedDate: string, type: string, status: string }> = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize the patients array with mock data or fetch it from a service
    this.patients = [
      {
        id: 1,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'rejected'
      },
      {
        id: 2,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'pending'
      },
      {
        id: 3,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'confirmed'
      },
      {
        id: 4,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'rejected'
      },
      {
        id: 5,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'pending'
      },
      {
        id: 6,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'confirmed'
      },
      {
        id: 6,
        name: 'John Doe',
        gender: 'Male',
        age: 45,
        admittedDate: '2024-09-01',
        type: 'Emergency',
        status: 'rejected'
      },
      // Add more patient objects as needed
    ];
  }
}
