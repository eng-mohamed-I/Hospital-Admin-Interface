import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  blogId: string | null = null;
  singleBlog: Blog | null = null; // Holds the blog data

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    // Get the blog ID from the route params
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      if (this.blogId) {
        // Fetch blog by ID using the service
        this.blogService.getBlogsById(this.blogId).subscribe({
          next: (data: any) => {
            this.singleBlog = data.blog;
          },
          error: (err) => {
            console.error('Error fetching blog:', err);
          }        
        });
      }
    });



  }
}
