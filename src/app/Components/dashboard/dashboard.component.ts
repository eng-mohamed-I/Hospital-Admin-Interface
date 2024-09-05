import { Component } from '@angular/core';
import { AppointmentsCalendarComponent } from '../appointments-calendar/appointments-calendar.component';
import { StatisticsChartComponent } from '../statistics-chart/statistics-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppointmentsCalendarComponent,StatisticsChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}
