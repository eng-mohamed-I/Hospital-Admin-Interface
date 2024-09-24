import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../services/department/department.service';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
  showAlert: boolean = false; // Control alert visibility

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.updateDoctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      userName: ['', Validators.required],
      nationalID: ['', [Validators.required, Validators.minLength(14)]],
      department: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      availableDates: [[]],
      newDate: ['']
    });

    // Load all departments
    this.loadDepartments();

    // Get the doctor ID from route params
    this.selectedDoctorId = this.route.snapshot.paramMap.get('id');
    
    // Load doctor details and populate the form
    this.loadDoctorDetails();
  }

  // Load departments from the service
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

  // Load the doctor's details to populate the form
  loadDoctorDetails(): void {
    this.doctorService.getDoctorById(this.selectedDoctorId).subscribe(
      (doctor) => {
        this.updateDoctorForm.patchValue({
          name: doctor.name,
          specialization: doctor.specialization,
          userName: doctor.userName,
          nationalID: doctor.nationalID,
          department: doctor.department?._id || '', // Assuming department has an _id field
          phone: doctor.phone,
          email: doctor.email,
          gender: doctor.gender,
          dateOfBirth: doctor.dateOfBirth,
          experience: doctor.experience,
          availableDates: doctor.availableDates || []
        });
      },
      (error) => {
        console.error('Error loading doctor details', error);
      }
    );
  }

  // Submit updated doctor information
  onSubmit(): void {
    if (this.updateDoctorForm.valid) {
      this.doctorService.updateDoctor(this.selectedDoctorId, this.updateDoctorForm.value).subscribe(
        () => {
          this.router.navigate(['/doctor']);
        },
        (error) => {
          console.error('Error updating doctor', error);
        }
      );
    }
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  // Add new available date
  addDate(): void {
    const newDate = this.updateDoctorForm.get('newDate')?.value;
  
    if (newDate) {
      const availableDatesControl = this.updateDoctorForm.get('availableDates');
      const availableDates = availableDatesControl?.value || [];
  
      // Check if the new date is valid and not already included
      const currentDate = new Date().setHours(0, 0, 0, 0); // Today's date
      const selectedDate = new Date(newDate).setHours(0, 0, 0, 0); // Selected date
  
      if (selectedDate >= currentDate) {
        if (!availableDates.includes(newDate)) {
          availableDates.push(newDate); // Add the new date
          availableDatesControl?.setValue(availableDates); // Update form
        }
        this.updateDoctorForm.get('newDate')?.reset(); // Clear input
      } else {
        this.showAlert = true; // Show alert for past dates
      }
    }
  }
  

  // Remove a specific date
  removeDate(index: number): void {
    const availableDates = this.updateDoctorForm.get('availableDates')?.value || [];
    availableDates.splice(index, 1);
    this.updateDoctorForm.get('availableDates')?.setValue(availableDates);
  }

  // Cancel and navigate back
  cancel(): void {
    this.router.navigate(['/doctor']);
  }
}
