import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./Components/layout/sidebar/sidebar.component";
import { AppointmentsCalendarComponent } from "./Components/appointments/appointments-calendar/appointments-calendar.component";
import { StatisticsChartComponent } from "./Components/dashboard/statistics-chart/statistics-chart.component";
import { HeaderComponent } from './Components/layout/header/header.component';
import { DailyAppointmentsComponent } from "./Components/daily-appointments/daily-appointments.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent,
    AppointmentsCalendarComponent, StatisticsChartComponent, DailyAppointmentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-system';
}
