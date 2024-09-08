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
  constructor() {}

}
