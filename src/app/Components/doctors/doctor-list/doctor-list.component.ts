import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { DepartmentService } from '../../../services/department/department.service'; // Import the service for departments

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
  departments: { _id: string; name: string }[] = []; // Define department type explicitly

  searchName: string = '';
  selectedDepartment: string = '';
  specialization: string = '';

  constructor(
    private doctorService: DoctorService, 
    private departmentService: DepartmentService, // Inject department service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getDepartments(); // Load departments on initialization
  }

  getDoctors(): void {
    this.doctorService.getDoctor().subscribe((doctors) => {
      this.doctors = doctors;
      this.filteredDoctors = [...this.doctors]; // Initialize filteredDoctors with all doctors
      console.log(this.doctors);
    });
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  filterDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor =>
      (!this.selectedDepartment || doctor.department._id === this.selectedDepartment) && // Compare with department ID
      // (!this.specialization || doctor.specialization === this.specialization) &&
      (!this.searchName || doctor.name.toLowerCase().includes(this.searchName.toLowerCase()))
    );
  }

  clearFilters(): void {
    this.searchName = '';
    this.selectedDepartment = '';
    this.specialization = '';
    this.filteredDoctors = [...this.doctors]; // Reset the filtered list to show all doctors
  }

  updateDoctor(_id: string): void {
    console.log(_id,"from list doctor");
    
    this.router.navigate(['/doctor/doctor-update', _id]);
  }

  deleteDoctor(_id: string): void {
    console.log(_id);
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(_id).subscribe(() => {
        this.getDoctors(); // Refresh the doctor list after deletion
      });
    }
  }
}
