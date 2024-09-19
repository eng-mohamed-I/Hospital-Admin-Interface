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
  styleUrl: './blog-management.component.css',
})
export class BlogManagementComponent implements OnInit {
  allblogs: Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAll().subscribe((data) => {
      this.allblogs = data;
      // console.log(this.allblogs);
      
    });
  }

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
