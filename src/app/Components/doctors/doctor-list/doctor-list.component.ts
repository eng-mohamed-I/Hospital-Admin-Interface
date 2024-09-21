import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';

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
  departments: string[] = []; 
  specialists: string[] = []; 

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctor().subscribe((doctors) => {
      this.doctors = doctors;
      this.filteredDoctors = doctors; 
      this.populateFilters();
      // console.log("ffff",doctors);
    });
  }

  populateFilters(): void {
    this.departments = Array.from(new Set(this.doctors.map(doc => doc.department?.name)));
    this.specialists = Array.from(new Set(this.doctors.map(doc => doc.specialization)));
  }

  // Filter doctors based on the search input
  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      return (
        (this.searchName === '' || doctor.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (this.selectedDepartment === '' || doctor.department?.name === this.selectedDepartment) &&
        (this.selectedSpecialist === '' || doctor.specialization === this.selectedSpecialist)
      );
    });
  }

  // Navigate to update doctor page
  updateDoctor(doctorId: string): void {
    this.router.navigate(['/update-doctor', doctorId]);
  }

  // Clear the search and filters
  clearFilters(): void {
    this.searchName = '';
    this.selectedDepartment = '';
    this.selectedSpecialist = '';
    this.filteredDoctors = this.doctors;
  }

  // Confirm delete action
  confirmDeleteDoctor(doctorId: string): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(doctorId).subscribe(() => {
        this.getDoctors();  // Refresh doctor list after deletion
      });
    }
  }

  // Navigate to doctor details
  viewDoctorDetails(id: string): void {
    this.router.navigate(['/doctor-details', id]);
  }
}
