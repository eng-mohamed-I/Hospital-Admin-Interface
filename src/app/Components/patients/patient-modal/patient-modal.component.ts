import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-patient-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.css']
})
export class PatientModalComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<PatientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient 
  ) {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['is not selected', Validators.required],
      isConfirmed: [false],
      donations: this.fb.array([]),
    });

    if (data) {
      this.loadPatientData(data); 
    }
  }

  get donations(): FormArray {
    return this.patientForm.get('donations') as FormArray;
  }

  addDonation(): void {
    this.donations.push(this.fb.group({
      amount: [null, Validators.required],
      date: [null, Validators.required],
    }));
  }

  removeDonation(index: number): void {
    this.donations.removeAt(index);
  }

  loadPatientData(patient: Patient): void {
    this.patientForm.patchValue({
      name: patient.name,
      email: patient.email,
      gender: patient.gender,
      isConfirmed: patient.isConfirmed,
    });

    if (patient.donations) {
      this.donations.clear(); 
      patient.donations.forEach(donation => {
        this.donations.push(this.fb.group({
          amount: donation.amount,
          date: donation.date,
        }));
      });
    }

    if(this.data && this.data._id){ // :')
      this.patientForm.removeControl('password');
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patient: Patient = this.patientForm.value;
  
      if (this.data && this.data._id) {
        // update
        this.patientService.updatePatient(this.data._id, patient).subscribe(() => {
          this.dialogRef.close(true);  
        }, error => {
          console.error('Error updating patient:', error);
        });

      } else {
        // new
        this.patientService.addPatient(patient).subscribe(() => {
          this.dialogRef.close(true);  
        }, error => {
          console.error('Error adding patient:', error);
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
