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
  constructor(private blogService: BlogService) {}

  allblogs: Blog[] = [];
  ngOnInit(): void {
    this.blogService.getAll().subscribe((data) => {
      this.allblogs = data;
    });
  }

  deleteItem(id: number) {
    this.blogService.delete(id).subscribe((data) => {
      this.allblogs = this.allblogs.filter((_) => _.id != id);
    });
  }
}
