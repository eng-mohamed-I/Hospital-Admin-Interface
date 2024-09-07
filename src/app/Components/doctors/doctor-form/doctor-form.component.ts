import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor.model';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [BsDatepickerModule, NgMultiSelectDropDownModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {
  doctorForm: FormGroup;
  departments: string[] = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'];
  specialists: string[] = ['Heart Specialist', 'Neurologist', 'Orthopedic Surgeon', 'Pediatrician', 'Dermatologist'];
  availableAppointments: { date: string, time: string }[] = [];
  selectedDate: string = '';
  selectedTime: string = '';
  datePickerConfig = {
    dateInputFormat: 'YYYY-MM-DD',
    showWeekNumbers: false,
    containerClass: 'theme-dark-blue'
  };

  private doctorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      specialist: ['', Validators.required],
      gender: ['', Validators.required],
      availableAppointments: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = +id;
        if (this.doctorId) {
          this.loadDoctor();
        }
      }
    });
  }

  private loadDoctor(): void {
    this.doctorService.getDoctorById(this.doctorId!).subscribe(doctor => {
      if (doctor) {
        this.doctorForm.patchValue({
          name: doctor.name,
          department: doctor.department,
          specialist: doctor.specialist,
          gender: doctor.gender
        });
        this.availableAppointments = doctor.availableAppointments || [];
      }
    });
  }

  saveDoctor(): void {
    if (this.doctorForm.valid) {
      const doctor: Doctor = this.doctorForm.value;
      doctor.availableAppointments = this.availableAppointments;

      const saveOperation = this.doctorId
        ? this.doctorService.updateDoctor(this.doctorId, doctor)
        : this.doctorService.addDoctor(doctor);

      saveOperation.subscribe(() => {
        this.router.navigate(['/doctor/doctor-list']);
      });
    } else {
      // Mark all controls as touched to trigger validation messages
      this.doctorForm.markAllAsTouched();
    }
  }

  onDateTimeChange(date: any): void {
    this.selectedDate = date;
  }

  onTimeChange(event: any): void {
    this.selectedTime = event.target.value;
    if (this.selectedDate && this.selectedTime) {
      this.addAppointment(this.selectedDate, this.selectedTime);
      this.selectedDate = '';
      this.selectedTime = '';
    }
  }

  addAppointment(date: string, time: string): void {
    if (date && time) {
      this.availableAppointments.push({ date, time });
      this.doctorForm.patchValue({ availableAppointments: this.availableAppointments });
    }
  }

  removeAppointment(appointment: { date: string, time: string }): void {
    this.availableAppointments = this.availableAppointments.filter(
      app => app.date !== appointment.date || app.time !== appointment.time
    );
    this.doctorForm.patchValue({ availableAppointments: this.availableAppointments });
  }
}
