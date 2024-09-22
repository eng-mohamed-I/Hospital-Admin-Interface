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
  constructor(private blogService: BlogService, private _router: Router) {}

  formdata: any = {
    title: "",
    body: "",
    url: ''
  };

  create() {
    console.log('Form Data:', this.formdata); 
    let data = this.formdata
  
    this.blogService.create(data).subscribe({
      next: (data) => {
        console.log('Created blog:', data);
        this._router.navigate(['/blog-management']);
      },
      error: (err) => {
        console.error("Blogs error" ,err);
      },
    });
  }
}
