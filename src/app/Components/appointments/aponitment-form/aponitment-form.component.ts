// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { AppointmentsService } from '../../../services/appointments/appointment.service';
// @Component({
//   selector: 'app-aponitment-form',
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule],
//   templateUrl: './aponitment-form.component.html',
//   styleUrl: './aponitment-form.component.css'
// })
// export class AddAppointmentComponent implements OnInit {

//   appointmentForm: FormGroup;
//   patients: any[] = [];
//   departments: any[] = [];
//   doctors: any[] = [];
//   availableDates: any[] = [];
//   availableTimes: string[] = [];

//   constructor(private fb: FormBuilder, private appointmentService: AppointmentsService) {
//     this.appointmentForm = this.fb.group({
//       patientId: ['', Validators.required],
//       departmentId: ['', Validators.required],
//       doctorId: ['', Validators.required],
//       date: ['', Validators.required],
//       time: ['', Validators.required],
//       phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]]
//     });
//   }

//   ngOnInit(): void {
//     this.loadPatients();
//     this.loadDepartments();
//   }

//   loadPatients(): void {
//     this.appointmentService.getPatients().subscribe((data: any) => {
//       this.patients = data;
//     });
//   }

//   loadDepartments(): void {
//     this.appointmentService.getDepartments().subscribe((data: any) => {
//       this.departments = data;
//     });
//   }

//   onDepartmentChange(event: any): void {
//     const departmentId = event.target.value;
//     this.appointmentService.getDoctorsByDepartment(departmentId).subscribe((data: any) => {
//       this.doctors = data;
//       this.availableDates = [];
//       this.availableTimes = [];
//     });
//   }

//   onDoctorChange(event: any): void {
//     const doctorId = event.target.value;
//     this.appointmentService.getAvailableDatesByDoctor(doctorId).subscribe((data: any) => {
//       this.availableDates = data;
//     });
//   }

//   onDateChange(event: any): void {
//     const selectedDate = event.target.value;
//     this.generateTimeSlots(selectedDate);
//   }

//   generateTimeSlots(date: string): void {
//     // Assuming doctor is available from 9 AM to 5 PM
//     const startTime = 9; 
//     const endTime = 17; 
//     const interval = 30; // 30 minutes

//     this.availableTimes = [];
//     for (let hour = startTime; hour < endTime; hour++) {
//       this.availableTimes.push(`${hour}:00`);
//       this.availableTimes.push(`${hour}:${interval}`);
//     }
//   }

//   bookAppointment(): void {
//     if (this.appointmentForm.valid) {
//       const appointmentData = this.appointmentForm.value;
//       this.appointmentService.bookAppointment(appointmentData).subscribe((response: any) => {
//         alert('Appointment booked successfully!');
//         this.appointmentForm.reset();
//       }, (error) => {
//         alert('Failed to book appointment');
//       });
//     } else {
//       this.appointmentForm.markAllAsTouched(); 
//     }
//   }
// }