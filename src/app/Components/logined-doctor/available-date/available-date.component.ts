import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { DoctorLoginService } from '../../../services/doctor/doctor-login.service';
import { Doctor } from '../../../models/doctor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './available-date.component.html',
  styleUrls: ['./available-date.component.css'],
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
      endTime: ['', Validators.required],
    });

    // Check if user is logged in and get the doctor's ID
    if (this.doctorLoginService.isUserLogedIn) {
      this.doctorId = this.getDoctorIdFromToken();
      if (this.doctorId) {
        console.log(this.doctorId);
        this.getDoctorAvailableDates(this.doctorId);
      }
    }
  }

  // Extract the doctor ID from the token
  getDoctorIdFromToken(): string | null {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken = this.doctorLoginService.decodeToken(token);
      return decodedToken ? decodedToken.id : null;
    }
    return null;
  }

  // Fetch available dates for the doctor and populate the form
  getDoctorAvailableDates(id: string) {
    this.doctorService.getDoctorByIdForUpdate(id).subscribe(
      (doctor: Doctor) => {
        this.availableDatesForm.patchValue({
          availableDates: doctor.availableDates || [],
        });
      },
      (error) => {
        console.error('Error fetching doctor data', error);
      }
    );
  }

  // Send updated available dates to the API
  updateDoctorAvailableDates() {
    if (this.doctorId) {
      const availableDates = this.availableDatesForm.get('availableDates')?.value;
      
      if (availableDates && availableDates.length > 0) {
        this.doctorService.updateDoctorAvailableDatE(this.doctorId, { availableDates }).subscribe(
          (updatedDoctor: Doctor) => {
            console.log('Doctor available dates updated successfully', updatedDoctor);
          },
          (error) => {
            console.error('Error updating available dates', error);
          }
        );
      } else {
        console.error('No available dates to update');
      }
    } else {
      console.error('Doctor ID is not available');
    }
  }

  // Add a new available date or update an existing one
  addDate(): void {
    const newDate = this.availableDatesForm.get('newDate')?.value;
    const startTime = this.availableDatesForm.get('startTime')?.value;
    const endTime = this.availableDatesForm.get('endTime')?.value;
    const availableDates = this.availableDatesForm.get('availableDates')?.value || [];
  
    const selectedDate = new Date(newDate).setHours(0, 0, 0, 0);

    // Validate date and time inputs
    if (newDate && startTime && endTime && selectedDate >= new Date().setHours(0, 0, 0, 0)) {
      const existingDateIndex = availableDates.findIndex(
        (date: any) => new Date(date.date).setHours(0, 0, 0, 0) === selectedDate
      );
  
      if (existingDateIndex !== -1) {
        // Update start and end times if the date already exists
        availableDates[existingDateIndex].fromTime = startTime;
        availableDates[existingDateIndex].toTime = endTime;
      } else {
        // Add a new date entry
        availableDates.push({
          date: newDate,
          fromTime: startTime,
          toTime: endTime
        });
      }

      // Update the form control with the new list of dates
      this.availableDatesForm.patchValue({ availableDates });
      
      // Call the update function to send data to the API
      this.updateDoctorAvailableDates();
      
      // Reset form inputs after adding or updating
      this.availableDatesForm.get('newDate')?.reset();
      this.availableDatesForm.get('startTime')?.reset();
      this.availableDatesForm.get('endTime')?.reset();
      
      this.showAlert = false; // Hide alert if inputs are valid
    } else {
      this.showAlert = true; // Show alert if date or time is invalid
    }
  }


  
  // Remove an available date
  removeDate(index: number): void {
    const availableDates =
      this.availableDatesForm.get('availableDates')?.value || [];
    availableDates.splice(index, 1);
    this.availableDatesForm.patchValue({ availableDates: availableDates });
    this.updateDoctorAvailableDates();
  }
}
