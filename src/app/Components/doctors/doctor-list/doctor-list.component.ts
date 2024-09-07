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
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];

  searchName: string = '';
  selectedDepartment: string = '';
  selectedSpecialist: string = '';

  departments: string[] = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'];
  specialists: string[] = ['Heart Specialist', 'Neurologist', 'Orthopedic Surgeon', 'Pediatrician', 'Dermatologist'];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.filteredDoctors = [...this.doctors]; // Initialize filteredDoctors with all doctors
    });
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor =>
      (!this.selectedDepartment || doctor.department === this.selectedDepartment) &&
      (!this.selectedSpecialist || doctor.specialist === this.selectedSpecialist) &&
      (!this.searchName || doctor.name.toLowerCase().includes(this.searchName.toLowerCase()))
    );
  }

  clearFilters(): void {
    this.searchName = '';
    this.selectedDepartment = '';
    this.selectedSpecialist = '';
    this.filteredDoctors = [...this.doctors]; // Reset the filtered list to show all doctors
  }

  updateDoctor(id: number): void {
    this.router.navigate(['/doctor/doctor-form', id]);
  }

  deleteDoctor(id: number): void {
    this.doctorService.deleteDoctor(id);
    this.doctorService.getDoctors().subscribe(doctors => this.doctors = doctors);
  }
  confirmDeleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.deleteDoctor(id);
    }
  }
}
