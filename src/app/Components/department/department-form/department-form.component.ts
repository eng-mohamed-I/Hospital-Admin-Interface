import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [NgFor, NgIf,ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css'
})
export class DepartmentFormComponent {

  departmentForm: FormGroup;
  selectedDoctors: any[] = []; // Array to store selected doctors

  doctors = [
    { name: "Dr. Jane Doe", specialty: "Ophthalmologist" },
    { name: "Dr. John Smith", specialty: "Optometrist" },
    { name: "Dr. Anglina Julie", specialty: "Optometrist" },
    { name: "Dr. Alan Green", specialty: "General Surgeon" },
    { name: "Dr. Lisa White", specialty: "Orthopedic Surgeon" }
  ];

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      departmentSpecialty: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      doctor: ['', Validators.required]
    });
  }

  // Add selected doctor to the array
  addDoctor() {
      const selectedDoctorName = this.departmentForm.get('doctor')?.value;
      if (selectedDoctorName) {
        const selectedDoctor = this.doctors.find(doctor => doctor.name === selectedDoctorName);
  
        // Check if the doctor is already added
        if (!this.selectedDoctors.includes(selectedDoctor)) {
          this.selectedDoctors.push(selectedDoctor);
        }
  
        // Clear the dropdown after adding
        this.departmentForm.patchValue({ doctor: '' });
      }
    }

     // Remove a doctor by index
  removeDoctor(index: number) {
    this.selectedDoctors.splice(index, 1);
  }


  // Handle form submission
  onSubmit() {
    if (this.departmentForm.valid) {
      const departmentData = {
        departmentName: this.departmentForm.get('departmentName')?.value,
        departmentSpecialty: this.departmentForm.get('departmentSpecialty')?.value,
        doctors: this.selectedDoctors
      };

      console.log('Department Data:', departmentData);

      // Clear form after submission
      this.departmentForm.reset();
      this.selectedDoctors = [];
    }
  }

}
