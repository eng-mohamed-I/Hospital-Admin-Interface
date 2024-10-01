import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DomSanitizer } from '@angular/platform-browser';

import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { DepartmentService } from '../../../services/department/department.service'; // Import the service for departments
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [BsDatepickerModule, NgMultiSelectDropDownModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm!: FormGroup;
  departments: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  imageError: boolean = false;
  showAlert: boolean = false;
  showAddedAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDepartments();
  }

  initForm() {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[a-z0-9._-]+$')  // allows lowercase letters, digits, and special characters (-, _, .)
      ]],
      image: [''],
      price:['',Validators.required],
      nationalID: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern('^[0-9]+$')]],
      department: ['', Validators.required],
      availableDates: this.fb.array([]), // Initializes as an empty FormArray
      phone: ['', [Validators.required, Validators.pattern(/^(011|010|015|012)\d{8}$/)]],  // Updated pattern
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$')  // Regex pattern for Gmail validation
      ]],      
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      history: ['']
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      (data) => this.departments = data.departments,
      (error) => console.error(error)
    );
  }

  addDate() {
    const availableDates = this.doctorForm.get('availableDates') as FormArray;
    availableDates.push(this.fb.group({
      date: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required],
    }));
  }

  removeDate(index: number) {
    const availableDates = this.doctorForm.get('availableDates') as FormArray;
    availableDates.removeAt(index);
  }
  saveDates() {
    if (this.doctorForm.valid) {
      const dates = this.availableDates.value;
      console.log('Saved Dates and Times:', dates);
      // You can process or send these dates to the server here
    } else {
      console.log('Form is invalid, please check the entered values');
    }
  }

  get availableDates(): FormArray {
    return this.doctorForm.get('availableDates') as FormArray;
  }


  closeAlert() {
    this.showAlert = true; // Ensure the alert is shown when triggered
    setTimeout(() => {
      this.showAlert = false; // Hide the alert after 2 seconds
      console.log("Alert closed automatically"); // Optional: for debugging
    }, 500);  
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0]; // Get the selected file
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result; // Display the selected image
          this.imageError = false; // Reset image error
        };
        reader.readAsDataURL(file);
        this.doctorForm.patchValue({ image: file }); // Update the form with the image
      } else {
        this.imageError = true; // Set image error
        this.imagePreview = null; // Reset image preview
      }
    }
  }

  showSuccessAlert() {
    console.log('Success alert triggered');
    this.showAddedAlert = true;
    setTimeout(() => {
      this.showAddedAlert = false;
      console.log('Success alert closed');
      this.router.navigate(['doctor/doctor-list']);
    }, 2000);
  }

  saveDoctor() {
    const today = new Date(); // Get today's date
    let hasPastDate = false;
  
    // Check if any selected date is in the past
    this.availableDates.controls.forEach((dateGroup) => {
      const selectedDate = new Date(dateGroup.get('date')?.value);
      if (selectedDate < today) {
        hasPastDate = true;
      }
    });
  
    if (hasPastDate) {
      this.showAlert = true; // Show the alert if there's a past date
    } else if (this.doctorForm.valid) {
      const formData = new FormData();
      
      this.showSuccessAlert();  // Call success alert on successful submission
      console.log('Doctor form is valid:', this.doctorForm.value);
  
      // Append all fields to formData except availableDates
      for (const key in this.doctorForm.value) {
        if (key !== 'availableDates') {
          formData.append(key, this.doctorForm.value[key]);
        }
      }
  
      // Append availableDates separately
      const availableDates = this.doctorForm.get('availableDates')?.value;
      formData.append('availableDates', JSON.stringify(availableDates));
  
      // Send data
      this.doctorService.addDoctor(formData).subscribe(
        () => {
          console.log('Doctor added successfully');
        },
        (error) => console.error(error)
      );
    } else {
      console.log('Doctor form is invalid');
      this.doctorForm.markAllAsTouched();
    }
  }
  
}
