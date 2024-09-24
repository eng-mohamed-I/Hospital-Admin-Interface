import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
          availableDates: doctor.availableDates.map(date => date.date) || []
        });
      },
      (error) => {
        console.error('Error loading doctor details', error);
      }
    );
  }

onSubmit(): void {
  if (this.updateDoctorForm.valid) {
    const updatedDoctor: Doctor = {
      _id: this.selectedDoctorId,
      ...this.updateDoctorForm.value,
      availableDates: this.updateDoctorForm.value.availableDates.map((date: string) => ({ date, fromTime: '', toTime: '' })), // Explicitly typing 'date'
    };

    this.doctorService.updateDoctor(this.selectedDoctorId, updatedDoctor).subscribe(
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

  addDate(): void {
    const newDate = this.updateDoctorForm.get('newDate')?.value;

    if (newDate) {
      const availableDatesControl = this.updateDoctorForm.get('availableDates');
      const availableDates = availableDatesControl?.value || [];
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const selectedDate = new Date(newDate).setHours(0, 0, 0, 0);

      if (selectedDate >= currentDate) {
        if (!availableDates.includes(newDate)) {
          availableDates.push(newDate);
          availableDatesControl?.setValue(availableDates);
        }
        this.updateDoctorForm.get('newDate')?.reset();
      } else {
        this.showAlert = true;
      }
    }
  }

  removeDate(index: number): void {
    const availableDates = this.updateDoctorForm.get('availableDates')?.value || [];
    availableDates.splice(index, 1);
    this.updateDoctorForm.get('availableDates')?.setValue(availableDates);
  }

  cancel(): void {
    this.router.navigate(['/doctor']);
  }
}
