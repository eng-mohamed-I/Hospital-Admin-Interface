import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DepartmentService } from '../../../services/department/department.service';
@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css'
})
export class DepartmentDetailsComponent {
  departments :any[] = []

  constructor(private _departmentService: DepartmentService) {}
  ngOnInit(): void {
    this._departmentService.getDepartments().subscribe(
      {
        next: (data) => { 
          this.departments = data.departments
        },
        error: (err) =>{ 
          console.log(err)
        }
      }
    )

    this.initDoctorDistributionChart();
    this.initDepartmentDoctorChart();
  }


  initDoctorDistributionChart() {
    const doctorDistributionCtx = document.getElementById('doctorDistributionChart') as HTMLCanvasElement;
    new Chart(doctorDistributionCtx, {
      type: 'pie',
      data: {
        labels: this.departments.map(dept => dept.name),
        datasets: [{
          label: 'Doctors per Department',
          data: this.departments.map(dept => dept.doctors.length),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc9c0','#36a2eb'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw} doctors`,
            }
          }
        }
      }
    });
  }

  initDepartmentDoctorChart() {
    const departmentDoctorCtx = document.getElementById('departmentDoctorChart') as HTMLCanvasElement;
    new Chart(departmentDoctorCtx, {
      type: 'bar',
      data: {
        labels: this.departments.map(dept => dept.name),
        datasets: [{
          label: 'Doctors per Department',
          data: this.departments.map(dept => dept.doctors.length),
          backgroundColor: '#42a5f5',
          borderColor: '#1e88e5',
          borderWidth: .5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Doctors'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Departments'
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          }
        }
      }
    });
  }


}
