// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { Doctor } from '../models/doctor.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class DoctorService {

//     private doctors: Doctor[] = [
//         {
//           id: 1,
//           name: 'Dr. John Smith',
//           department: 'Cardiology',
//           specialist: 'Heart Specialist',
//           gender: 'Male',
//            availableAppointments: [
//         { date: '2024-09-10', time: '10:00' },
//         { date: '2024-09-12', time: '14:00' }
//       ]
//         },
//         {
//           id: 2,
//           name: 'Dr. Emily Davis',
//           department: 'Neurology',
//           specialist: 'Neurologist',
//           gender: 'Female',
//            availableAppointments: [
//         { date: '2024-09-10', time: '10:00' },
//         { date: '2024-09-12', time: '14:00' }
//       ]
//         },
//         {
//           id: 3,
//           name: 'Dr. Michael Brown',
//           department: 'Orthopedics',
//           specialist: 'Orthopedic Surgeon',
//           gender: 'Male',
//            availableAppointments: [
//         { date: '2024-09-10', time: '10:00' },
//         { date: '2024-09-12', time: '14:00' }
//       ]
//         },
//         {
//           id: 4,
//           name: 'Dr. Sarah Johnson',
//           department: 'Pediatrics',
//           specialist: 'Pediatrician',
//           gender: 'Female',
//            availableAppointments: [
//         { date: '2024-09-10', time: '10:00' },
//         { date: '2024-09-12', time: '14:00' }
//       ]
//         },
//         {
//           id: 5,
//           name: 'Dr. David Wilson',
//           department: 'Dermatology',
//           specialist: 'Dermatologist',
//           gender: 'Male',
//            availableAppointments: [
//         { date: '2024-09-10', time: '10:00' },
//         { date: '2024-09-12', time: '14:00' }
//       ]
//         }
//       ];
//         private doctorsSubject = new BehaviorSubject<Doctor[]>(this.doctors);

//   constructor() { }

//   // Get all doctors
//   getDoctors(): Observable<Doctor[]> {
//     return this.doctorsSubject.asObservable();
//   }

//   // Get doctor by ID
//   getDoctorById(id: number): Observable<Doctor> {
//     const doctor = this.doctors.find(doc => doc.id === id);
//     return new BehaviorSubject<Doctor>(doctor!).asObservable();
//   }

//   // Add a new doctor
//   addDoctor(doctor: Doctor): Observable<Doctor[]> {
//     this.doctors.push(doctor);
//     this.doctorsSubject.next(this.doctors);
//     return this.doctorsSubject.asObservable(); // Return Observable of updated doctors list
//   }
//   // Update an existing doctor
//   updateDoctor(id: number, updatedDoctor: Doctor): Observable<Doctor[]> {
//     const index = this.doctors.findIndex(doc => doc.id === id);
//     if (index !== -1) {
//       this.doctors[index] = updatedDoctor;
//       this.doctorsSubject.next(this.doctors);
//     }
//     return of(this.doctors); // Return Observable of updated doctors list
//   }
//   // Delete a doctor
//   deleteDoctor(id: number): void {
//     this.doctors = this.doctors.filter(doc => doc.id !== id);
//     this.doctorsSubject.next(this.doctors);
//   }
// }
