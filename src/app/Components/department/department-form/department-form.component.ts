import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {

  departmentForm: FormGroup;
  selectedDoctors: any[] = []; // Array to store selected doctors
  doctors: any[] = []; // Array to store fetched doctors
  departments: any[] = []; // Array to store fetched departments

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      departmentSpecialty: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      doctor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  // Fetch doctors from the API
  // Fetch departments from the API
  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
      }
    });
  }

  // Add selected doctor to the array
  addDoctor(): void {
    const selectedDoctorId = this.departmentForm.get('doctor')?.value;
    if (selectedDoctorId) {
      const selectedDoctor = this.doctors.find(doctor => doctor._id === selectedDoctorId);

      // Check if the doctor is already added
      if (selectedDoctor && !this.selectedDoctors.includes(selectedDoctor)) {
        this.selectedDoctors.push(selectedDoctor);
      }

      // Clear the dropdown after adding
      this.departmentForm.patchValue({ doctor: '' });
    }
  }

  // Remove a doctor by index
  removeDoctor(index: number): void {
    this.selectedDoctors.splice(index, 1);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.departmentForm.valid) {
      const departmentData = {
        departmentName: this.departmentForm.get('departmentName')?.value,
        departmentSpecialty: this.departmentForm.get('departmentSpecialty')?.value,
        doctors: this.selectedDoctors.map(doc => doc._id) // Send only doctor IDs
      };

      this.departmentService.addDepartment(departmentData).subscribe({
        next: (response) => {
          console.log('Department added successfully:', response);

          // Clear form after submission
          this.departmentForm.reset();
          this.selectedDoctors = [];
          this.loadDepartments(); // Refresh the department list
        },
        error: (err) => {
          console.error('Error adding department:', err);
        }
      });
    }
  }

  // Delete a department
  deleteDepartment(departmentId: string): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(departmentId).subscribe({
        next: (response) => {
          console.log('Department deleted successfully:', response);
          this.loadDepartments(); // Refresh the department list
        },
        error: (err) => {
          console.error('Error deleting department:', err);
        }
      });
    }
  }
}
