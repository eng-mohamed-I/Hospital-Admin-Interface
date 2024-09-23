import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { PatientModalComponent } from '../patient-modal/patient-modal.component';

@Component({
  selector: 'app-patients-table',
  standalone: true,
  imports: [CommonModule],
   templateUrl: './patients-table.component.html',
  styleUrl: './patients-table.component.css'
})
export class PatientsTableComponent implements OnInit {


  showConfirmModal: boolean = false;

  patients: Patient[] = [];
  confirmDeleteId: string | null = null;

  constructor(private patientService: PatientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientService.getAllPatients().subscribe((response) => {
      this.patients = response.data;
       // Accessing the 'data' field from the response
    });
  }

  openPatientModal(patient?: Patient): void {
    const dialogRef = this.dialog.open(PatientModalComponent, {
      width: '500px',
      data: patient || {}, // Pass the whole patient object
      panelClass: 'centered-dialog'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchPatients(); // Refresh the patient list after modal closes
      }
    });
  }
  
  deletePatient(id: string): void {
    this.confirmDeleteId = id; // Set the ID to confirm deletion
  }

  confirmDelete(): void {
    if (this.confirmDeleteId) {
      this.patientService.deletePatient(this.confirmDeleteId).subscribe({
        next: () => {
          this.patients = this.patients.filter((p) => p._id !== this.confirmDeleteId);
          this.confirmDeleteId = null; // Reset confirmation state
        },
        error: (err) => {
          console.error('Error deleting patient:', err);
        }
      });
    }
  }

  cancelDelete(): void {
    this.confirmDeleteId = null; // Reset confirmation state
  }

  
  
}
