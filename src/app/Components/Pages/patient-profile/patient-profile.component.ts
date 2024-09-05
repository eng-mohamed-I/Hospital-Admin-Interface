import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patient: any = {
    name: 'Dr. Iqbal Chowdhury',
    image: 'path-to-image',
    phone: '(907) 555-0101',
    email: 'iqbalchowdhury28@gmail.com',
    address: '457 Estem evon Cottage area, New York',
    gender: 'Male',
    dob: '23/10/2020',
    registerDate: '22/09/2020',
    city: 'Essex',
    physicalExam: {
      heart: 'Blockage in left artery - 120 min/Hg',
      lungs: 'Congestion in left side of chest - 72/min',
      abdomen: 'Pain on right side - 71.6 Kg',
      volumetricStatus: 'S/P - 71.6 Kg'
    },
    reports: [
      { id: 1, name: 'Checkup Result', date: '12 Mon, 2022' },
      { id: 2, name: 'Medicine Prescription', date: '17 Jan, 2022' },
      // Other reports
    ],
    healthyHabits: {
      followingPlan: 10,
      skipped: 5,
      outsidePlan: 25
    }
  };
 
  constructor() {}

  ngOnInit(): void {}

  deleteReport(reportId: number): void {
    this.patient.reports = this.patient.reports.filter((report: { id: number }) => report.id !== reportId);
  }
}
