
import { Component, OnInit } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blog.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css'],
})
export class BlogManagementComponent implements OnInit {
  allblogs: Blog[] = [];
  isModalVisible = false;
  modalMessage = '';
  itemToDelete: number | null = null;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll().subscribe((data) => {
      this.allblogs = data;
    });
  }

  openDeleteConfirmation(id: number): void {
    this.itemToDelete = id;
    this.modalMessage = 'Are you sure you want to delete this blog?';
    this.isModalVisible = true;
  }

  confirmDelete(): void {
    if (this.itemToDelete === null) return;

    this.blogService.delete(this.itemToDelete).subscribe({
      next: () => {
        this.allblogs = this.allblogs.filter((blog) => blog.id !== this.itemToDelete);
        // alert('Blog has been deleted successfully.');
      },
      error: (err) => {
        console.error('Error deleting blog:', err);
        // alert('Please try deleting again.');
      },
    });
    this.itemToDelete = null;
    this.isModalVisible = false;
  }

  cancelDelete(): void {
    this.itemToDelete = null;
    this.isModalVisible = false;
  }
}




