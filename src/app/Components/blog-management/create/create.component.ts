import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  formdata: any = {
    title: '',
    body: '',
  };
  
  selectedFile: File | null = null;

  constructor(private blogService: BlogService, private _router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  create() {
    const formData = new FormData();
    formData.append('title', this.formdata.title);
    formData.append('body', this.formdata.body);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.blogService.create(formData).subscribe({
      next: (data) => {
        console.log('Created blog:', data);
        this._router.navigate(['/blog-management']);
      },
      error: (err) => {
        console.error('Blogs error', err);
      },
    });
  }
}
