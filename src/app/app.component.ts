import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./Components/layout/sidebar/sidebar.component";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppointmentsCalendarComponent } from "./Components/appointments-calendar/appointments-calendar.component";
import { StatisticsChartComponent } from "./Components/statistics-chart/statistics-chart.component";
import { HeaderComponent } from './Components/layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent,
    SlickCarouselModule, AppointmentsCalendarComponent, StatisticsChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-admin-interface';
}
