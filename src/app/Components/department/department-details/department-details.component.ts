import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

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

}
