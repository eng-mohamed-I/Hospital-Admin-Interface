import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department/department.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass, CommonModule, RouterLink],
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  searchTerm: string = '';
  sortOrder: string = 'asc'; // Default sorting order
  departments: any[] = []; // Set departments as an empty array
  showConfirmModal: boolean = false;
  selectedDepartment: any = null;
  selectedDepartmentIndex: any;
  loading: boolean = true; // Track loading state
  error: string | null = null; // Track errors

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    this.fetchDepartments();
  }

  departmentDoctor(id: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.departmentService.getDepartmentDoctors(id).subscribe(
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

  fetchDepartments() {
    this.loading = true;
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response.departments;
        this.departments.forEach((dep) => {
          this.departmentDoctor(dep._id).then((doctors) => {
            dep.doctors = doctors;
          });
        });
        console.log(this.departments)
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load departments';
        this.loading = false;
      },
    });
  }

  filteredDepartments() {
    let filtered = this.departments.filter((department) =>
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
    console.log(department);
  }

  openConfirmDialog(index: any, department: any) {
    if (department && department._id) {
      this.selectedDepartmentIndex = index;
      this.selectedDepartment = department;
      this.showConfirmModal = true;
    } else {
      console.error(
        'Attempted to open confirm dialog with invalid department:',
        department
      );
      this.error = 'Invalid department selected for deletion';
    }
  }

  closeConfirmDialog() {
    this.showConfirmModal = false;
    this.selectedDepartment = null;
  }
  confirmDelete() {
    // Check if `selectedDepartment` is valid
    if (this.selectedDepartment && this.selectedDepartment._id) {
      console.log(
        'Attempting to delete department with ID:',
        this.selectedDepartment._id
      ); // Debug log

      this.departmentService
        .deleteDepartment(this.selectedDepartment._id)
        .subscribe({
          next: () => {
            this.departments.splice(this.selectedDepartmentIndex, 1); //wala yhemk ya 3m :(
            // Remove the deleted department from the local list
            // console.log(this.selectedDepartment)
            // this.departments = this.departments.filter(dep => dep._id !== this.selectedDepartment._id);
            console.log(
              'Department successfully deleted:',
              this.selectedDepartment
            ); // Debug log
          },
          error: (err) => {
            console.error('Error deleting department:', err);
            this.error = 'Failed to delete department';
          },
        });
    } else {
      console.error(
        'Selected department is invalid or missing _id:',
        this.selectedDepartment
      ); // Debug log
      this.error = 'Selected department is invalid or missing an ID';
    }

    this.closeConfirmDialog();
  }
}
