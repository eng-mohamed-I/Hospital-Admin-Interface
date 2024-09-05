import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chartData: number[] = [120, 45, 75];
  chartLabels: string[] = ['Patients', 'Doctors', 'Appointments'];
  chartType: ChartType = 'doughnut';

  ngOnInit(): void {}
}
