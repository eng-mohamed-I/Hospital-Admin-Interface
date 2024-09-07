import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'] // Fixed typo
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of doctors when the component initializes
    this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }

  updateDoctor(id: number): void {
    this.router.navigate(['/doctor/doctor-form', id]);
  }

  deleteDoctor(id: number): void {
    // Call delete method from the service
    this.doctorService.deleteDoctor(id);
    // Optionally, you can reload the list or handle after deletion
    this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }
  confirmDeleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.deleteDoctor(id);
    }
  }
}
