import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentService } from '../../../services/department/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  selectedDoctors: any[] = []; // Array to store selected doctors
  doctors: any[] = []; // Array to store fetched doctors
  message: string = '';

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) {
    this.departmentForm = this.fb.group({
      departmentName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      departmentDescription: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]*')],
      ],
      doctor: [''],
    });
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  // get all doctors
  getDoctors(): void {
    this.departmentService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error('err fetch doctors:', err);
      },
    });
  }

  // add selected doctor
  addDoctor(): void {
    const selectedDoctorId = this.departmentForm.get('doctor')?.value;
    if (selectedDoctorId) {
      const selectedDoctor = this.doctors.find(
        (doctor) => doctor.name === selectedDoctorId
      );

      // Check if the doctor is already added
      if (selectedDoctor && !this.selectedDoctors.includes(selectedDoctor)) {
        this.selectedDoctors.push(selectedDoctor);
      }

      // Clear the dropdown after adding
      // this.departmentForm.patchValue({ doctor: '' });
    }
  }

  // Remove a doctor by index
  removeDoctor(index: number): void {
    this.selectedDoctors.splice(index, 1);
  }

  // this for clear message
  clearMessage(messaeg: string) {
    setTimeout(() => {
      this.message = '';
    }, 2000);
  }

  // Handle form submission
  onSubmit(): void {
    console.log(this.departmentForm.value);
    if (this.departmentForm.valid) {
      const departmentData = {
        name: this.departmentForm.get('departmentName')?.value,
        description: this.departmentForm.get('departmentDescription')?.value,
        doctors: this.selectedDoctors.map((doc) => doc._id),
      };
      console.log(departmentData);
      this.departmentService.addDepartment(departmentData).subscribe({
        next: (response) => {
          // show success message
          this.message = response.message;
          this.departmentForm.reset();
          this.selectedDoctors = [];

          // clear message
          this.clearMessage(this.message);
          setTimeout(() => {
            this._router.navigate(['/department/list']);
          }, 2000);
        },
        error: (err) => {
          // show error message
          this.message = err.error.message;

          // clear message
          this.clearMessage(this.message);
        },
      });
    }
  }
}
