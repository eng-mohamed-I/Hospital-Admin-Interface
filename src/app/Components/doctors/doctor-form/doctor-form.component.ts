import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Department, Doctor } from '../../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [BsDatepickerModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm!: FormGroup;
  doctorId: string | null = null; // Use for update functionality

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      specialization: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(5)]],
      image: this.fb.group({
        secure_url: ['', Validators.required],
        public_id: ['', Validators.required]
      }),
      nationalID: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      department: ['', [Validators.required]],
      availableDates: this.fb.array([]),
      contactInfo: this.fb.group({
        phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }),
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      experience: ['', [Validators.required, Validators.min(0)]],
      history: [''],
      statistics: this.fb.group({
        patientsTreated: [0],
        successfulTreatments: [0],
        failedTreatments: [0]
      }),
      appointments: this.fb.array([])
    });
  }

  // Getters for form arrays
  get availableDates(): FormArray {
    return this.doctorForm.get('availableDates') as FormArray;
  }

  get appointments(): FormArray {
    return this.doctorForm.get('appointments') as FormArray;
  }

  // Add a new available date
  addAvailableDate(): void {
    this.availableDates.push(this.fb.control('', Validators.required));
  }

  // Add a new appointment
  addAppointment(): void {
    const appointment = this.fb.group({
      appointID: [''],
      patientID: [''],
      date: ['', Validators.required],
      time: ['', Validators.required],
      report: ['']
    });
    this.appointments.push(appointment);
  }

  // Remove available date by index
  removeAvailableDate(index: number): void {
    this.availableDates.removeAt(index);
  }

  // Remove appointment by index
  removeAppointment(index: number): void {
    this.appointments.removeAt(index);
  }

  // Submit the form
  saveDoctor(): void {
    if (this.doctorForm.valid) {
      const formData = new FormData();

      formData.append('name', this.doctorForm.get('name')?.value);
      formData.append('specialization', this.doctorForm.get('specialization')?.value);
      formData.append('userName', this.doctorForm.get('userName')?.value);

      // Append image data
      const imageGroup = this.doctorForm.get('image');
      if (imageGroup) {
        formData.append('image.secure_url', imageGroup.get('secure_url')?.value);
        formData.append('image.public_id', imageGroup.get('public_id')?.value);
      }

      formData.append('nationalID', this.doctorForm.get('nationalID')?.value);
      formData.append('department', this.doctorForm.get('department')?.value);

      // Append available dates
      this.availableDates.controls.forEach((control, index) => {
        formData.append(`availableDates[${index}]`, control.value);
      });

      const contactInfoGroup = this.doctorForm.get('contactInfo');
      if (contactInfoGroup) {
        formData.append('contactInfo.phone', contactInfoGroup.get('phone')?.value);
        formData.append('contactInfo.email', contactInfoGroup.get('email')?.value);
        formData.append('contactInfo.password', contactInfoGroup.get('password')?.value);
      }

      formData.append('gender', this.doctorForm.get('gender')?.value);
      formData.append('dateOfBirth', this.doctorForm.get('dateOfBirth')?.value);
      formData.append('experience', this.doctorForm.get('experience')?.value);
      formData.append('history', this.doctorForm.get('history')?.value);

      // Append statistics data
      const statisticsGroup = this.doctorForm.get('statistics');
      if (statisticsGroup) {
        Object.keys(statisticsGroup.addAsyncValidators).forEach(key => {
          formData.append(`statistics.${key}`, statisticsGroup.get(key)?.value);
        });
      }

      // Append appointments
      this.appointments.controls.forEach((control, index) => {
        formData.append(`appointments[${index}][appointID]`, control.get('appointID')?.value);
        formData.append(`appointments[${index}][patientID]`, control.get('patientID')?.value);
        formData.append(`appointments[${index}][date]`, control.get('date')?.value);
        formData.append(`appointments[${index}][time]`, control.get('time')?.value);
        formData.append(`appointments[${index}][report]`, control.get('report')?.value);
      });

      // Perform API call
      if (this.doctorId) {
        // Update doctor
        this.doctorService.updateDoctor(this.doctorId, formData).subscribe({
          next: () => this.router.navigate(['/doctors']),
          error: err => console.error(err)
        });
      } else {
        // Add new doctor
        this.doctorService.addDoctor(formData).subscribe({
          next: () => this.router.navigate(['/doctors']),
          error: err => console.error(err)
        });
      }
    }
  }
}