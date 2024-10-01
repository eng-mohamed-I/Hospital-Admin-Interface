import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'], // Fixed the styleUrl to styleUrls
})
export class DepartmentDetailsComponent {
  departments: any[] = [];

  constructor(private _departmentService: DepartmentService) {}

  ngOnInit(): void {
    this._departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data.departments;

        this.departments.forEach((dep) => {
          this.departmentDoctor(dep._id).then((doctors) => {
            dep.doctors = doctors;
            this.initDoctorDistributionChart();
            this.initDepartmentDoctorChart();
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  departmentDoctor(id: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._departmentService.getDepartmentDoctors(id).subscribe(
        (res) => {
          resolve(res.doctors);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  initDoctorDistributionChart() {
    const doctorDistributionCtx = document.getElementById(
      'doctorDistributionChart'
    ) as HTMLCanvasElement;

    new Chart(doctorDistributionCtx, {
      type: 'pie',
      data: {
        labels: this.departments.map((dept) => dept.name),
        datasets: [
          {
            label: 'Doctors per Department',
            data: this.departments.map((dept) => dept.doctors.length),
            backgroundColor: [
              '#ff6384',
              '#36a2eb',
              '#ffce56',
              '#4bc9c0',
              '#36a2eb',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) =>
                `${tooltipItem.label}: ${tooltipItem.raw} doctors`,
            },
          },
        },
      },
    });
  }

  initDepartmentDoctorChart() {
    const departmentDoctorCtx = document.getElementById(
      'departmentDoctorChart'
    ) as HTMLCanvasElement;

    new Chart(departmentDoctorCtx, {
      type: 'bar',
      data: {
        labels: this.departments.map((dept) => dept.name),
        datasets: [
          {
            label: 'Doctors per Department',
            data: this.departments.map((dept) => dept.doctors.length),
            backgroundColor: '#42a5f5',
            borderColor: '#1e88e5',
            borderWidth: 0.5,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Doctors',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Departments',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
