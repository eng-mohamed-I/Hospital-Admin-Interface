import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
  admittedDate: string;
  type: string;
  status?: string;
}

@Component({
  selector: 'app-patient-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './patient-modal.component.html',
  styleUrl: './patient-modal.component.css'
})
export class PatientModalComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Patient // Inject the passed data
  ) {
    this.patientForm = this.fb.group({
      name: [data?.name || '', [Validators.required, Validators.minLength(3)]],
      gender: [data?.gender || 'Male', Validators.required],
      age: [data?.age || null, [Validators.required, Validators.min(1), Validators.max(120)]],
      admittedDate: [data?.admittedDate || '', Validators.required],
      type: [data?.type || 'Inpatient', Validators.required],
    });

    if (data) {
      this.patientForm.patchValue(data);
    }
  }
  onSave(): void {
    if (this.patientForm.valid) {
      this.dialogRef.close(this.patientForm.value); // Pass the form data back to the parent
    } else {
      this.patientForm.markAllAsTouched(); // Show validation errors
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
  onSubmit() {
    if (this.patientForm.valid) {
      this.patientForm.markAllAsTouched();
      this.dialogRef.close(this.patientForm.value);
      return; 
    } 
    
    else {
      this.patientForm.markAllAsTouched();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
