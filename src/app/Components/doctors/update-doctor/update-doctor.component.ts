import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../services/department/department.service';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Doctor } from '../../../models/doctor.model';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [BsDatepickerModule, NgMultiSelectDropDownModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  updateDoctorForm!: FormGroup;
  departments: any[] = [];
  selectedDoctorId: any;
  showAlert: boolean = false;
  imageUrl: string | ArrayBuffer | null = null; // For previewing the uploaded image

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateDoctorForm = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      nationalID: ['', [Validators.required, Validators.minLength(14)]],
      department: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      availableDates: this.fb.array([]), // Initialize as a FormArray
      image: [null], // Add image form control
    });

    this.loadDepartments();
    this.selectedDoctorId = this.route.snapshot.paramMap.get('id');
    this.loadDoctorDetails();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data.departments;
      },
      (error) => {
        console.error('Error loading departments', error);
      }
    );
  }

  loadDoctorDetails(): void {
    this.doctorService.getDoctorById(this.selectedDoctorId).subscribe(
      (doctor: Doctor) => {
        this.updateDoctorForm.patchValue({
          name: doctor.name,
          specialization: doctor.specialization,
          userName: doctor.userName,
          nationalID: doctor.nationalID,
          department: doctor.department?._id || '',
          phone: doctor.phone,
          email: doctor.email,
          gender: doctor.gender,
          dateOfBirth: doctor.dateOfBirth,
          experience: doctor.experience,
          image: doctor.Image || null  // Ensure this aligns with your Doctor model
        });

        this.imageUrl = doctor.Image?.secure_url || null; // Use optional chaining

        // Load available dates into the FormArray
        doctor.availableDates.forEach(date => {
          this.addDate(date.date, date.fromTime, date.toTime);
        });
      },
      (error) => {
        console.error('Error loading doctor details', error);
      }
    );
  }

  get availableDates(): FormArray {
    return this.updateDoctorForm.get('availableDates') as FormArray;
  }

  addDate(date: string = '', fromTime: string = '', toTime: string = ''): void {
    const newDateGroup = this.fb.group({
      date: [date, Validators.required],
      fromTime: [fromTime, Validators.required],
      toTime: [toTime, Validators.required],
    });

    this.availableDates.push(newDateGroup);
  }

  removeDate(index: number): void {
    this.availableDates.removeAt(index);
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // Set imageUrl for preview
      };
      reader.readAsDataURL(file);

      // Update the form control with the file object, not the file name or URL
      this.updateDoctorForm.patchValue({ image: file });
    }
  }
  
  onSubmit(): void {
    // Reset the alert before validation
    this.showAlert = false;

    // Check for past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    for (const dateGroup of this.availableDates.controls) {
      const dateValue = dateGroup.get('date')?.value;
      const selectedDate = new Date(dateValue);

      if (selectedDate < today) {
        this.showAlert = true; // Show the alert if any date is in the past
        break; // Exit the loop as soon as we find a past date
      }
    }

    if (this.showAlert) {
      console.log('One or more dates are in the past. Please select a valid date.');
      return; // Prevent form submission
    }

    // Proceed with the submission if all dates are valid
    if (this.updateDoctorForm.valid) {
      const formData = new FormData();
      // Append other form fields to FormData as shown earlier
      formData.append('availableDates', JSON.stringify(this.updateDoctorForm.value.availableDates));
      // Append the image if selected
      if (this.updateDoctorForm.get('image')?.value) {
        formData.append('image', this.updateDoctorForm.get('image')?.value);
      }

      this.doctorService.updateDoctor(this.selectedDoctorId, formData).subscribe(
        () => {
          this.router.navigate(['/doctor']);
        },
        (error) => {
          console.error('Error updating doctor', error);
        }
      );
    } else {
      console.log('Form is invalid, please check the entered values');
    }
  }

  closeAlert() {
    this.showAlert = true; // Ensure the alert is shown when triggered
    setTimeout(() => {
      this.showAlert = false; // Hide the alert after 2 seconds
    }, 500);  
  }

  cancel(): void {
    this.router.navigate(['/doctor']);
  }
}
