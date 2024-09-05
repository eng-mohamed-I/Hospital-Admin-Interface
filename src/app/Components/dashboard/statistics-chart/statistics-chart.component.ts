import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-statistics-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-chart.component.html',
  styleUrls: ['./statistics-chart.component.css']
})
export class StatisticsChartComponent implements AfterViewInit {

  chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    }
  }

  createChart(): void {
    try {
      // Register the necessary components
      Chart.register(...registerables);

      const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line', // Specify the chart type
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            scales: {
              x: {
                type: 'category'
              },
              y: {
                type: 'linear'
              }
            }
          }
        });
      } else {
        console.error("Failed to get 2D context from canvas");
      }
    } catch (error) {
      console.error("Failed to create chart:", error);
    }
  }
}
