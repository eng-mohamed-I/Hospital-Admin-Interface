import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PatientModalComponent } from '../patient-modal/patient-modal.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

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
  imports: [CommonModule,ReactiveFormsModule, PatientModalComponent, ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css'
})
export class PatientsTableComponent  implements OnInit {
 
  patients: Patient[] = [];
  patientForm: FormGroup;
  currentPatientId: number | null = null; // Used for editing
  isFormVisible: boolean = false; // Control form visibility

  constructor(private fb: FormBuilder,public dialog: MatDialog) {
    this.patientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name must have at least 3 characters
      gender: ['Male', Validators.required],
      age: [null, [Validators.required, Validators.min(1), Validators.max(120)]], // Age must be between 1 and 120
      admittedDate: ['', Validators.required],
      type: ['Inpatient', Validators.required],
    });
  }

  ngOnInit(): void {
    // Initialize with some patients (optional)
    this.patients = [
      { id: 1, name: 'John Doe', gender: 'Male', age: 30, admittedDate: '2024-09-01', type: 'Inpatient', status: 'confirmed' },
      { id: 2, name: 'Jane Smith', gender: 'Female', age: 25, admittedDate: '2024-09-05', type: 'Outpatient', status: 'pending' },
    ];
  }

  openPatientModal(patient?: Patient): void {
    const dialogRef = this.dialog.open(PatientModalComponent, {
      width: '500px',
      data: patient || {}, // Pass any data you want to edit here
      panelClass: 'centered-dialog' // Add custom class
    });

    dialogRef.afterClosed().subscribe(result => {
       if (result) {
      if (patient) {
        // Update the patient
        const index = this.patients.findIndex(p => p.id === patient.id);
        if (index > -1) {
          this.patients[index] = result; // Update the edited patient
        }
      } else {
        // Add new patient
        result.id = this.patients.length + 1; // Assign a new ID
        result.status = 'pending'; // Set a default status
        this.patients.push(result); // Add the new patient to the list
      }
    }
  });
    
  }


  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
    console.log(this.isFormVisible);  // Add this for debugging
    if (this.isFormVisible) {
      this.patientForm.reset({ gender: 'Male', type: 'Inpatient' });
      this.currentPatientId = null;
    }
  }
  

  // editPatient(patient: Patient) {
  //   this.currentPatientId = patient.id;
  //   this.patientForm.patchValue(patient);
  //   this.isFormVisible = true; // Show the form when editing
  // }

  deletePatient(id: number) {
 
    if(confirm('Are you sure you want to delete that user'))  this.patients = this.patients.filter((p) => p.id !== id);
  }
}