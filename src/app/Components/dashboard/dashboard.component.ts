import { Component, OnInit } from '@angular/core';
import { AppointmentsCalendarComponent } from '../appointments/appointments-calendar/appointments-calendar.component';
import { StatisticsChartComponent } from './statistics-chart/statistics-chart.component';
import { PatientService } from '../../services/patient.service';
import { DepartmentService } from '../../services/department/department.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppointmentsCalendarComponent, StatisticsChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  patients: any;
  departments: any;
  constructor(
    private _patientService: PatientService,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this._patientService.getAllPatients().subscribe(
      (res) => {
        this.patients = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
    this._departmentService.getDepartments().subscribe(
      (res) => {this.departments = res.departments} ,
      (err) => {console.log(err)}
    );
  }
}
