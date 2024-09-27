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
  oldImage: string = ''; // Variable to store the old image URL
  selectedFile: File | null = null; // Variable to hold the new image file

  formdata: any = {
    title: '',
    body: '',
  };

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

  getById(id: any) {
    this.blogService.getBlogsById(id).subscribe((data) => {
      this.id = id;
      this.formdata.title = data.blog.title;
      this.formdata.body = data.blog.body;
      this.oldImage = data.blog.Image.secure_url; // Store the old image URL
    });
  }

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  update() {
    const formData = new FormData();
    formData.append('title', this.formdata.title);
    formData.append('body', this.formdata.body);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // Append the new image if selected
    }

    this.blogService.update(formData, this.id).subscribe({
      next: (data) => {
        this.router.navigate(['/blog-management']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
