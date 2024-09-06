import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(private blogService: BlogService, private router: Router) {}

  formdata: Blog = {
    id: 0,
    url: '',
    title: '',
    body: '',
  };

  create() {
    this.blogService.create(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(['/blog-management']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
