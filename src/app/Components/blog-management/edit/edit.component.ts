import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id: any;
  imagePreview: string | ArrayBuffer | null = '';
  formdata: any = {
    title: '',
    body: '',
    image: '',
  };
  successMessage: string = ' ';
  errorMessage: string = ' ';

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.getById(id);
    });
  }

  clearMessage() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }

  getById(id: any) {
    this.blogService.getBlogsById(id).subscribe((data) => {
      this.id = id;
      this.formdata.title = data.blog.title;
      this.formdata.body = data.blog.body;
      this.imagePreview = data.blog.image.secure_url;
    });
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.formdata.image = event.target.files[0];
    console.log(this.formdata);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      if (reader.result) {
        this.imagePreview = reader.result;
      }
    };
  }

  update() {
    const formData = new FormData();
    formData.append('title', this.formdata.title);
    formData.append('body', this.formdata.body);

    if (this.formdata.image) {
      formData.append('image', this.formdata.image); // Append the new image if selected
    }
    console.log(this.formdata);
    this.blogService.update(formData, this.id).subscribe({
      next: (data) => {
        this.successMessage = 'Blog updated successfully';
        this.clearMessage()
        this.router.navigate(['/blog-management']);
      },
      error: (er) => {
        console.log(er);
        this.errorMessage = 'Faild to update';
        this.clearMessage();
      },
    });
  }
}
