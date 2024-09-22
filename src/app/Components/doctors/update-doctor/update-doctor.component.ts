import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [BsDatepickerModule, NgMultiSelectDropDownModule, CommonModule,ReactiveFormsModule],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  updateDoctorForm: FormGroup;
  doctorId: string | null = null;
  newDate: string = ''; // Add this property to your component class
  showAlert: boolean = false; // Add this property to your component class
  
  
  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateDoctorForm = this.formBuilder.group({
      department: ['', Validators.required],
      specialization: ['', Validators.required],
      availableDates: [[], Validators.required],
      newDate: [''] // For adding new dates
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id');
      if (this.doctorId) {
        this.getDoctorById(this.doctorId);
      }
    });
  }


  getDoctorById(id: string): void {
    this.doctorService.getDoctorByIdForUpdate(id).subscribe(doctor => {
      this.updateDoctorForm.patchValue({
        department: doctor.department._id,
        specialization: doctor.specialization,
        availableDates: doctor.availableDates || []
      });
    });
  }

  addDate(): void {
    const newDateValue = this.updateDoctorForm.get('newDate')?.value;
    const availableDates = this.updateDoctorForm.get('availableDates')?.value;

    if (newDateValue) {
      const currentDate = new Date().setHours(0, 0, 0, 0); // Today's date
      const selectedDate = new Date(newDateValue).setHours(0, 0, 0, 0); // Selected date

      if (selectedDate >= currentDate) {
        availableDates.push(newDateValue);  // Add valid date
        this.updateDoctorForm.get('availableDates')?.setValue(availableDates);  // Update form
        this.updateDoctorForm.get('newDate')?.setValue('');  // Clear input
        this.showAlert = false; // Hide any existing alert
      } else {
        this.showAlert = true;  // Show custom alert for invalid date
      }
    }
  }

  closeAlert(): void {
    this.showAlert = false;
  }

  removeDate(index: number): void {
    const availableDates = this.updateDoctorForm.get('availableDates')?.value;
    if (availableDates) {
      availableDates.splice(index, 1);  // Remove selected date
      this.updateDoctorForm.get('availableDates')?.setValue(availableDates);  // Update form
    }
  }

  onSubmit(): void {
    if (this.updateDoctorForm.valid && this.doctorId !== null) {
      this.doctorService.updateDoctor(this.doctorId, this.updateDoctorForm.value).subscribe(
        () => this.router.navigate(['/doctor/doctor-list']),
        (error) => console.error('Error updating doctor:', error)
      );
    } else {
      this.updateDoctorForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['doctor/doctor-list']);
  }
}
