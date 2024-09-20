import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private blogService: BlogService, private router: Router) {}

  formdata: Blog = {
    _id: 0,
    url: '',
    Image: {
      secure_url: '', // Set to an empty string or leave as undefined if not required
      public_id: ''   // Set to an empty string or leave as undefined if not required
    },    title: '',
    body: '',
  };

  selectedFile: File | null = null;

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  create() {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.formdata.title);
    formData.append('body', this.formdata.body);
    formData.append('image', this.selectedFile);

    this.blogService.create(formData).subscribe({
      next: (data) => {
        console.log('Created blog:', data);
        this.router.navigate(['/blog-management']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
