import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../blog.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  // formData
  blogData: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  selectedFile: File | null = null;
  imagePrview: any;
  fullImage: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private _blogService: BlogService, private _router: Router) {}

  async onFileSelected(event: any) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.imagePrview = fileReader.result;
      this.blogData.patchValue({ image: file });
      console.log(this.blogData.value);
    };
  }

  showFullImage() {
    this.fullImage = true;
  }

  hideFullImage() {
    this.fullImage = false;
  }

  clearMessage() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }

  create() {
    this.blogData.markAllAsTouched();
    if (this.blogData.valid) {
      this.isLoading = true;
      const formData = new FormData();
      console.log(formData);
      formData.append('title', this.blogData.get('title')?.value);
      formData.append('body', this.blogData.get('body')?.value);
      if (this.blogData.get('image')?.value) {
        formData.append('image', this.blogData.get('image')?.value);
      }
      console.log('Valid');
      this.successMessage = 'Blog created successfully';
      this.clearMessage();
      this._blogService.create(formData).subscribe({
        next: (data) => {
          console.log('Created blog:', data);
          this._router.navigate(['/blog-management']);
        },
        error: (err) => {
          console.error('Blogs error', err);
          this.errorMessage = 'Faild to create blog'; 
          this.isLoading = false;
        },
      });
    }
  }
}
