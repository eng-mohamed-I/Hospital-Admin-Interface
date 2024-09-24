import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Import FormBuilder and FormGroup
import { DoctorService } from '../../../services/doctor/add-doctor/doctor.service';
import { DoctorLoginService } from '../../../services/doctor/doctor-login.service';
import { Doctor } from '../../../models/doctor.model'; // Import Doctor model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './available-date.component.html',
  styleUrls: ['./available-date.component.css']
})
export class AvailableDateComponent implements OnInit {
  doctorId: string | null = null;
  availableDatesForm!: FormGroup; // Form group for available dates
  showAlert: boolean = false; // Control alert visibility

  constructor(
    private fb: FormBuilder, // FormBuilder injection
    private doctorService: DoctorService,
    private doctorLoginService: DoctorLoginService // Inject the DoctorLoginService
  ) {}

  ngOnInit() {
    // Initialize the form group with form controls
    this.availableDatesForm = this.fb.group({
      availableDates: [[]], // Array of available dates
      newDate: [''] // New date input
    });

    if (this.doctorLoginService.isUserLogedIn) {
      this.doctorId = this.getDoctorIdFromToken(); // Get the doctor ID from the token
      if (this.doctorId) {
        this.getDoctorAvailableDates(this.doctorId);
      }
    }
  }

  getDoctorIdFromToken(): string | null {
    const token = localStorage.getItem('userToken'); // Use the saved token
    if (token) {
      const decodedToken = this.doctorLoginService.decodeToken(token); // Use the decodeToken method
      return decodedToken ? decodedToken.id : null; // Get the 'id' property from the decoded token
    }
    return null;
  }

  getDoctorAvailableDates(id: string) {
    this.doctorService.getDoctorByIdForUpdate(id).subscribe(
      (doctor: Doctor) => {
        // Update the form control with available dates
        this.availableDatesForm.patchValue({
          availableDates: doctor.availableDates || []
        });
      },
      (error) => {
        console.error('Error fetching doctor data', error);
      }
    );
  }

  // Update available dates
  async updateDoctorAvailableDates() {
    if (this.doctorId) {
      try {
        // Fetch the existing doctor details
        const doctor = await this.doctorService.getDoctorByIdForUpdate(this.doctorId).toPromise();
  
        if (doctor) {
          // Create a new object with the existing doctor details and updated available dates
          const updatedDoctor: Doctor = {
            ...doctor, // Spread existing doctor details
            availableDates: this.availableDatesForm.value.availableDates // Update available dates
          };
  
          // Call the service method to update the doctor's available dates
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
  
  closeAlert(): void {
    this.showAlert = false;
  }

  // Add a new date
  addDate(): void {
    const newDate = this.availableDatesForm.get('newDate')?.value;
    const availableDates = this.availableDatesForm.get('availableDates')?.value || [];

    // Check if the date is not already included and it's not in the past
    const selectedDate = new Date(newDate).setHours(0, 0, 0, 0);
    if (newDate && !availableDates.includes(newDate) && selectedDate >= new Date().setHours(0, 0, 0, 0)) {
      availableDates.push(newDate);
      this.availableDatesForm.patchValue({ availableDates: availableDates });
      this.availableDatesForm.get('newDate')?.reset(); // Clear input
    }else {
      this.showAlert = true; // Show alert for past dates
    }
  }

  // Remove a date
  removeDate(index: number): void {
    const availableDates = this.availableDatesForm.get('availableDates')?.value || [];
    availableDates.splice(index, 1);
    this.availableDatesForm.patchValue({ availableDates: availableDates });
  }
}
