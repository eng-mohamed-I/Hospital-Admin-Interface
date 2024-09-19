import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Department, Doctor } from '../../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [BsDatepickerModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  departments: Department[] = [];
  specialists: string[] = ['Heart Specialist', 'Neurologist', 'Orthopedic Surgeon', 'Pediatrician', 'Dermatologist'];
  availableAppointments: { date: string, time: string }[] = [];
  selectedDate: string = '';
  selectedTime: string = '';
  datePickerConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    containerClass: 'theme-dark-blue'
  };
  selectedImage: File | null = null;
  loading = false;
  error: string | null = null;

  private doctorId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private departmentService: DepartmentService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      specialization: ['', Validators.required],
      gender: ['', Validators.required],  // Add gender field
      userName: ['', Validators.required],
      nationalID: ['', Validators.required],
      contactInfo: this.fb.group({ 
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // phone control
        email: ['', [Validators.required, Validators.email]], // email control
      }),
      dateOfBirth: ['', Validators.required],
      experience: ['', Validators.required],
      history: ['', Validators.required],
      availableAppointments: this.fb.array([]), // For available appointments
      image: ['']
    });
  }

  ngOnInit(): void {
    this.fetchDepartments(); 
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = id;
        if (this.doctorId) {
          this.loadDoctor();
        }
      }
    });
  }

  private loadDoctor(): void {
    this.doctorService.getDoctorById(this.doctorId!).subscribe(doctor => {
      if (doctor) {
        this.doctorForm.patchValue({
          name: doctor.name,
          department: doctor.department._id, 
          specialization: doctor.specialization,
          gender: doctor.gender,
          userName: doctor.userName,
          nationalID: doctor.nationalID,
          contactInfo: {
            email: doctor.contactInfo.email,
            phone: doctor.contactInfo.phone
          },
          dateOfBirth: doctor.dateOfBirth,
          experience: doctor.experience,
          history: doctor.history,
          availableAppointments: doctor.availableAppointments
        });
        
        if (doctor.image) {
          this.selectedDate = doctor.image; // Set the image URL for display
        }
      }
    });
  }

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.departments;
      },
      error: (err) => {
        this.error = 'Failed to load departments';
      }
    });
  }

  saveDoctor(): void {
    if (this.doctorForm.valid) {
      this.loading = true;
      const doctorData = this.doctorForm.value;
      if (this.doctorId) {
        this.doctorService.updateDoctor(this.doctorId, doctorData).subscribe({
          next: () => this.router.navigate(['/doctors']),
          error: err => {
            console.log(err);
            this.loading = false;
            this.error = err.message;
          }
        });
      } else {
        this.doctorService.addDoctor(doctorData).subscribe({
          next: () => this.router.navigate(['/doctors']),
          error: err => {
            this.loading = false;
            console.log(err);
            this.error = err.message;
          }
        });
      }
    }
  }

  onDateTimeChange(event: any): void {
    this.selectedDate = event?.toISOString().split('T')[0];
  }

  onTimeChange(event: any): void {
    this.selectedTime = event.target.value;
  }

  removeAppointment(appointment: { date: string, time: string }): void {
    const appointments = this.doctorForm.get('availableAppointments') as FormArray;
    const index = appointments.controls.findIndex(app => app.value.date === appointment.date && app.value.time === appointment.time);
    if (index > -1) {
      appointments.removeAt(index);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedImage = input.files[0]; 
    } else {
      this.selectedImage = null;
    }
  }
}
