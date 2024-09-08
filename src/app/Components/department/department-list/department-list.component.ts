import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [NgFor,FormsModule,NgClass],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent {
  searchTerm: string = '';
  sortOrder: string = 'asc'; // Default sorting order
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

  
  showConfirmModal: boolean = false;
  selectedDepartment: any = null;

  filteredDepartments() {
    let filtered = this.departments.filter(department =>
      department.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return this.sortDepartments(filtered);
  }

  sortDepartments(departments: any[] = this.departments) {
    return departments.sort((a, b) => {
      const aCount = a.doctors.length;
      const bCount = b.doctors.length;
      if (this.sortOrder === 'asc') {
        return aCount - bCount;
      } else {
        return bCount - aCount;
      }
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.sortOrder = 'asc';
  }

  updateDepartment(department: any) {
    // Logic to update the department
    console.log('Updating department:', department);
  }

  openConfirmDialog(department: any) {
    this.selectedDepartment = department;
    this.showConfirmModal = true;
  }

  closeConfirmDialog() {
    this.showConfirmModal = false;
    this.selectedDepartment = null;
  }

  confirmDelete() {
    if (this.selectedDepartment) {
      this.departments = this.departments.filter(dep => dep !== this.selectedDepartment);
      console.log('Deleted department:', this.selectedDepartment);
    }
    this.closeConfirmDialog();
  }
}
