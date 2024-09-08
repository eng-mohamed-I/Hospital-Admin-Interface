import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments = [
    {
      name: "Ophthalmology Department",
      doctors: [
        { name: "Dr. Jane Doe", specialty: "Ophthalmologist" },
        { name: "Dr. John Smith", specialty: "Optometrist" }
      ]
    },
    {
      name: "Surgery Department",
      doctors: [
        { name: "Dr. Alan Green", specialty: "General Surgeon" },
        { name: "Dr. Lisa White", specialty: "Orthopedic Surgeon" }
      ]
    },
    {
      name: "Obstetrics Department",
      doctors: [
        { name: "Dr. Sarah Blue", specialty: "Obstetrician" },
        { name: "Dr. Maria Red", specialty: "Gynecologist" }
      ]
    },
    {
      name: "Pediatrics Department",
      doctors: [
        { name: "Dr. Max Brown", specialty: "Pediatrician" },
        { name: "Dr. Emma Purple", specialty: "Neonatologist" }
      ]
    }
  ];
// Get the total number of departments
getDepartmentLength(): number {
  return this.departments.length;
}

// Get the total number of doctors across all departments
getTotalDoctors(): number {
  return this.departments.reduce((total, dept) => total + dept.doctors.length, 0);
}

// Get the department with the most doctors
getLargestDepartment(): string {
  const largest = this.departments.reduce((prev, current) => {
    return current.doctors.length > prev.doctors.length ? current : prev;
  });
  return largest.name;
}

// Get the department with the fewest doctors
getSmallestDepartment(): string {
  const smallest = this.departments.reduce((prev, current) => {
    return current.doctors.length < prev.doctors.length ? current : prev;
  });
  return smallest.name;
}

// Get the average number of doctors per department
getAverageDoctorsPerDepartment(): number {
  const totalDoctors = this.getTotalDoctors();
  const totalDepartments = this.getDepartmentLength();
  return totalDoctors / totalDepartments;
}

// Generate intelligent analysis
getAnalysis(): string {
  const totalDoctors = this.getTotalDoctors();
  const totalDepartments = this.getDepartmentLength();
  const largestDept = this.getLargestDepartment();
  const smallestDept = this.getSmallestDepartment();
  const avgDoctors = this.getAverageDoctorsPerDepartment().toFixed(1);

  return `There are a total of ${totalDoctors} doctors across ${totalDepartments} departments.
          The department with the most doctors is the ${largestDept}, while the ${smallestDept} has the fewest.
          On average, each department has approximately ${avgDoctors} doctors.`;
}


  constructor() {}

}
