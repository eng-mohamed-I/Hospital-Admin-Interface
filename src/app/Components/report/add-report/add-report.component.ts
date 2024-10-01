import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../../services/report/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-report',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import ReactiveFormsModule here
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css'],
})
export class AddReportComponent implements OnInit {
  appointmentForm: FormGroup;
  appointmentID: string;

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private _reportService: ReportService,
    private _route: Router
  ) {
    this.appointmentForm = this.fb.group({
      doctorName: ['', Validators.required],
      patientName: ['', Validators.required],
      diagnosis: ['', Validators.required],
      doctorComment: ['', Validators.required],
      treatmentPrescription: ['', Validators.required],
      department: ['', Validators.required],
      followUpRecommendations: ['', Validators.required],
    });
    this.appointmentID = this.router.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.loadAppointmentDetails();
  }

  loadAppointmentDetails() {
    this._reportService.getAppointmentDetails(this.appointmentID).subscribe(
      (data) => {

        // console.log("Data:",data);
        
        // Pre-fill the form with data from the appointment
        this.appointmentForm.patchValue({
          doctorName: data.doctorName,
          patientName: data.patientName,
          department: data.department,
        });
      },
      (error) => {
        console.error('Error fetching appointment details:', error);
      }
    );
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      let report = {
        appointmentId: this.appointmentID,
        doctorName: this.appointmentForm.value.doctorName,
        patientName: this.appointmentForm.value.patientName,
        diagnosis: this.appointmentForm.value.diagnosis,
        doctorComment: this.appointmentForm.value.doctorComment,
        treatmentPrescription: this.appointmentForm.value.treatmentPrescription,
        department: this.appointmentForm.value.department,
        patientAddress: this.appointmentForm.value.patientAddress,
        patientPhoneNumber: this.appointmentForm.value.patientPhoneNumber,
        followUpRecommendations:
          this.appointmentForm.value.followUpRecommendations,
      };

      this._reportService.createReport(report).subscribe(
        (res) => {
          this._route.navigateByUrl('/doctor-appointment');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
