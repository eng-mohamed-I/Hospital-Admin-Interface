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
      availableDates: this.fb.array([]), // Initialize as a FormArray
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
        });

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

  onSubmit(): void {
    if (this.updateDoctorForm.valid) {
      const updatedDoctor: Doctor = {
        _id: this.selectedDoctorId,
        ...this.updateDoctorForm.value,
        availableDates: this.updateDoctorForm.value.availableDates.map((dateGroup: any) => ({
          date: dateGroup.date,
          fromTime: dateGroup.fromTime,
          toTime: dateGroup.toTime,
        })),
      };

      this.doctorService.updateDoctor(this.selectedDoctorId, updatedDoctor).subscribe(
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

  closeAlert(): void {
    this.showAlert = false;
  }

  cancel(): void {
    this.router.navigate(['/doctor']);
  }
}
