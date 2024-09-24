import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { DoctorLoginService } from '../../../services/doctor/doctor-login.service';
import { Doctor } from '../../../models/doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './available-date.component.html',
  styleUrls: ['./available-date.component.css']
})
export class AvailableDateComponent implements OnInit {
  doctorId: string | null = null;
  availableDatesForm!: FormGroup;
  showAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private doctorLoginService: DoctorLoginService
  ) {}

  ngOnInit() {
    this.availableDatesForm = this.fb.group({
      availableDates: [[]],
      newDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    if (this.doctorLoginService.isUserLogedIn) {
      this.doctorId = this.getDoctorIdFromToken();
      if (this.doctorId) {
        this.getDoctorAvailableDates(this.doctorId);
      }
    }
  }

  getDoctorIdFromToken(): string | null {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = this.doctorLoginService.decodeToken(token);
      return decodedToken ? decodedToken.id : null;
    }
    return null;
  }

  getDoctorAvailableDates(id: string) {
    this.doctorService.getDoctorByIdForUpdate(id).subscribe(
      (doctor: Doctor) => {
        this.availableDatesForm.patchValue({
          availableDates: doctor.availableDates || []
        });
      },
      (error) => {
        console.error('Error fetching doctor data', error);
      }
    );
  }

  async updateDoctorAvailableDates() {
    if (this.doctorId) {
      try {
        const doctor = await this.doctorService.getDoctorByIdForUpdate(this.doctorId).toPromise();
        if (doctor) {
          const updatedDoctor: Doctor = {
            ...doctor,
            availableDates: this.availableDatesForm.value.availableDates
          };
          this.doctorService.updateDoctorAvailableDate(this.doctorId, updatedDoctor).subscribe(
            (updatedDoctor: Doctor) => {
              console.log('Doctor available dates updated successfully', updatedDoctor);
            },
            (error) => {
              console.error('Error updating available dates', error);
            }
          );
        } else {
          console.error('Doctor not found');
        }
      } catch (error) {
        console.error('Error fetching doctor data for update', error);
      }
    }
  }

  // Add a new date with start and end times
  addDate(): void {
    const newDate = this.availableDatesForm.get('newDate')?.value;
    const startTime = this.availableDatesForm.get('startTime')?.value;
    const endTime = this.availableDatesForm.get('endTime')?.value;
    const availableDates = this.availableDatesForm.get('availableDates')?.value || [];

    const selectedDate = new Date(newDate).setHours(0, 0, 0, 0);

    // Validate the date and time
    if (newDate && startTime && endTime && selectedDate >= new Date().setHours(0, 0, 0, 0)) {
        // Check if the date already exists in the available dates
        const existingDateIndex = availableDates.findIndex(
            (date: any) => new Date(date.date).setHours(0, 0, 0, 0) === selectedDate
        );

        if (existingDateIndex !== -1) {
            // If the date already exists, update its start and end times
            availableDates[existingDateIndex].fromTime = startTime;
            availableDates[existingDateIndex].toTime = endTime;
        } else {
            // If it doesn't exist, push the new date along with startTime and endTime
            availableDates.push({
                date: newDate,
                fromTime: startTime,
                toTime: endTime
            });
        }

        // Update the form control with the new array of dates
        this.availableDatesForm.patchValue({ availableDates });

        // Clear the inputs after adding or updating the date and time
        this.availableDatesForm.get('newDate')?.reset();
        this.availableDatesForm.get('startTime')?.reset();
        this.availableDatesForm.get('endTime')?.reset();

        this.showAlert = false; // Hide alert if all inputs are valid
    } else {
        this.showAlert = true; // Show alert if the date or time is invalid
    }
}

  // Remove a date
  removeDate(index: number): void {
    const availableDates = this.availableDatesForm.get('availableDates')?.value || [];
    availableDates.splice(index, 1);
    this.availableDatesForm.patchValue({ availableDates: availableDates });
  }
}
