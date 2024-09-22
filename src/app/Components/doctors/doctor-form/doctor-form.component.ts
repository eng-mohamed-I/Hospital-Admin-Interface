import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [BsDatepickerModule, NgMultiSelectDropDownModule, CommonModule, ReactiveFormsModule,FormsModule  ],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  newDate: string = '';  // Holds the new date input value
  departments: any[] = [];
  selectedImage: File | null = null;
  doctorId: number | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      department: ['', Validators.required],
      specialization: ['', Validators.required],
      gender: ['', Validators.required],
      nationalID: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      availableDates: [[], Validators.required],  // Array to hold multiple dates
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      experience: [0, [Validators.required, Validators.min(0)]],
      dateOfBirth: ['', Validators.required],
      history: [''],
      statistics: [null],
      appointments: [[]]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = +id;
        if (this.doctorId) {
          this.loadDoctor();
        }
      }
    });

    
  }

  // Load departments from API
  loadDepartments(): void {
    this.doctorService.getDepartments().subscribe(departments=> {
      this.departments = departments.departments;
    });
  }

  // Load doctor data
  private loadDoctor(): void {
    this.doctorService.getDoctorById(this.doctorId!).subscribe((doctor: Doctor) => {
      if (doctor) {
        this.doctorForm.patchValue({
          name: doctor.name,
          userName: doctor.userName,
          department: doctor.department,
          specialization: doctor.specialization,
          gender: doctor.gender,
          nationalID: doctor.nationalID,
          availableDates: doctor.availableDates || [],
          phone: doctor.phone,
          email: doctor.email,
          experience: doctor.experience,
          dateOfBirth: doctor.dateOfBirth,
          history: doctor.history,
          statistics: doctor.statistics,
          appointments: doctor.appointments
        });
      }
    });
  }

  // Add new date to availableDates array
  addDate(): void {
    const availableDates = this.doctorForm.get('availableDates')?.value;
    if (this.newDate && availableDates) {
      availableDates.push(this.newDate);  // Add the new date to the array
      this.doctorForm.get('availableDates')?.setValue(availableDates);  // Update the form control
      this.newDate = '';  // Clear the input field
    }
  }

  // Remove a date from the array
  removeDate(index: number): void {
    const availableDates = this.doctorForm.get('availableDates')?.value;
    if (availableDates) {
      availableDates.splice(index, 1);  // Remove the selected date
      this.doctorForm.get('availableDates')?.setValue(availableDates);  // Update the form control
    }
  }

  // Save or update doctor
  saveDoctor(): void {
    if (this.doctorForm.valid) {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append('name', this.doctorForm.get('name')?.value);
      formData.append('specialization', this.doctorForm.get('specialization')?.value);
      formData.append('userName', this.doctorForm.get('userName')?.value);
      formData.append('nationalID', this.doctorForm.get('nationalID')?.value);
      formData.append('department', this.doctorForm.get('department')?.value);
      formData.append('availableDates', JSON.stringify(this.doctorForm.get('availableDates')?.value));
      formData.append('gender', this.doctorForm.get('gender')?.value);
      formData.append('dateOfBirth', this.doctorForm.get('dateOfBirth')?.value);
      formData.append('experience', this.doctorForm.get('experience')?.value);
      formData.append('history', this.doctorForm.get('history')?.value);
      formData.append('phone', this.doctorForm.get('phone')?.value);
      formData.append('email', this.doctorForm.get('email')?.value);
      formData.append('password', this.doctorForm.get('password')?.value);

      // Append image if selected
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
      // Call service to save or update the doctor
      this.doctorService.addDoctor(formData).subscribe(() => {
        this.router.navigate(['/doctor/doctor-list']);
      });
    } else {
      this.doctorForm.markAllAsTouched();
    }
  }

  // Handle file selection for image
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        this.imageError = false; // Reset error if valid
        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageError = true; // Show error if invalid
        this.selectedImage = null; // Reset selected image
        this.imagePreview = null; // Reset preview
      }
    }
  }
}