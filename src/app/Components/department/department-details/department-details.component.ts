import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css'
})
export class DepartmentDetailsComponent {
  departments = [
    {
      name: "Ophthalmology",
      doctors: [
        { name: "Dr. Jane Doe", specialty: "Ophthalmologist" },
        { name: "Dr. John Smith", specialty: "Optometrist" },
        { name: "Dr. Anglina julie", specialty: "Optometrist" }
      ]
    },
    {
      name: "Surgery",
      doctors: [
        { name: "Dr. Alan Green", specialty: "General Surgeon" },
        { name: "Dr. Lisa White", specialty: "Orthopedic Surgeon" }
      ]
    },
    {
      name: "Obstetrics",
      doctors: [
        { name: "Dr. Sarah Blue", specialty: "Obstetrician" },
        { name: "Dr. Maria Red", specialty: "Gynecologist" }
      ]
    },
    {
      name: "Pediatrics",
      doctors: [
        { name: "Dr. Max Brown", specialty: "Pediatrician" },
        { name: "Dr. Emma Purple", specialty: "Neonatologist" }
      ]
    }
  ];

  ngOnInit(): void {
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
