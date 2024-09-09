import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
  admittedDate: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css'
})
export class PatientsTableComponent  implements OnInit {
  patients: Patient[] = [];
  patientForm: FormGroup;
  currentPatientId: number | null = null; // Used for editing
  isFormVisible: boolean = false; // Control form visibility

  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['Male', Validators.required],
      age: [null, Validators.required],
      admittedDate: ['', Validators.required],
      type: ['Inpatient', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialize with some patients (optional)
    this.patients = [
      { id: 1, name: 'John Doe', gender: 'Male', age: 30, admittedDate: '2024-09-01', type: 'Inpatient', status: 'confirmed' },
      { id: 2, name: 'Jane Smith', gender: 'Female', age: 25, admittedDate: '2024-09-05', type: 'Outpatient', status: 'pending' }
    ];
  }

  onSubmit() {
    if (this.currentPatientId === null) {
      // Add new patient
      const newPatient: Patient = {
        id: this.patients.length + 1,
        ...this.patientForm.value,
        status: 'pending',
      };
      this.patients.push(newPatient);
    } else {
      // Update existing patient
      const index = this.patients.findIndex((p) => p.id === this.currentPatientId);
      if (index > -1) {
        this.patients[index] = { ...this.patients[index], ...this.patientForm.value };
      }
      this.currentPatientId = null;
    }

    // Clear the form and hide it
    this.patientForm.reset({ gender: 'Male', type: 'Inpatient' });
    this.isFormVisible = false;
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    if (this.isFormVisible) {
      // Reset the form when opening to add a new patient
      this.patientForm.reset({ gender: 'Male', type: 'Inpatient' });
      this.currentPatientId = null; // Ensure it's not in edit mode
    }
  }

  editPatient(patient: Patient) {
    this.currentPatientId = patient.id;
    this.patientForm.patchValue(patient);
    this.isFormVisible = true; // Show the form when editing
  }

  deletePatient(id: number) {
    this.patients = this.patients.filter((p) => p.id !== id);
  }
}