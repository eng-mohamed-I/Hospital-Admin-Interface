import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrl: './blog-management.component.css',
})
export class BlogManagementComponent implements OnInit {
  allblogs: any[] = [];
  confirmDeleteId: string | null = null;
  currentPage: number = 1;
  blogsPerPage: number = 4;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;
  isEmpty: boolean = false;
  searchTerm: string = '';
  fullImage: boolean = false;
  imageUrl: any = '';
  fullBody: boolean = false;
  bodyText: any = '';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll().subscribe({
      next: (data) => {
        console.log(data.blogs);
        this.allblogs = data.blogs;
        data.blogs.length === 0
          ? (this.isEmpty = true)
          : (this.isEmpty = false);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Error Fetching BLogs', err);
      },
    });
  }

  showFullImage(url: string) {
    this.imageUrl = url;
    this.fullImage = true;
  }
  closeFullImage() {
    this.imageUrl = '';
    this.fullImage = false;
  }

  showFullBody(text: string) {
    this.bodyText = text;
    this.fullBody = true;
  }
  closeFullBody() {
    this.bodyText = '';
    this.fullBody = false;
  }

  felterBlog() {
    let filterd = this.allblogs.filter((blog) => {
      return blog.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    if (filterd.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
    return filterd;
  }

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.blogsPerPage;
    return this.allblogs.slice(startIndex, startIndex + this.blogsPerPage);
  }

  createPagesArray() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  deleteBlog(id: string): void {
    this.confirmDeleteId = id;
  }

  cancelDelete(): void {
    this.confirmDeleteId = null;
  }

  confirmDelete(index: any): void {
    this.blogService.delete(this.confirmDeleteId).subscribe({
      next: () => {
        this.allblogs.splice(index, 1);
        if (this.allblogs.length === 0) {
          this.isEmpty = true;
        }
      },
      error: (err) => {
        console.log('error', err);
      },
    });
    console.log(this.confirmDeleteId);
  }

  openDeleteConfirmation(id: any) {}

  // deleteItem(id: number) {
  //   const confirmation = confirm('Are you sure you want to delete this blog?');
  //   if (!confirmation) return;
  //   this.blogService.delete(id).subscribe({
  //     next: () => {
  //       this.allblogs = this.allblogs.filter((blog) => blog._id !== id);
  //       alert('Blog has been deleted successfully.');
  //     },
  //     error: (err) => {
  //       console.error('Error deleting blog:', err);
  //       alert('Please try delete again.');
  //     },
  //   });
  // }
}
