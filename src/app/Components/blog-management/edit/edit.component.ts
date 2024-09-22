import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blog } from '../blog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  formdata: any = {

    url: '',
    title: '',
    body: '',
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.getById(id);
    });
  }
  getById(id: any) {
    this.blogService.getBlogsById(id).subscribe((data) => {
      console.log(data)
      this.formdata = data.blog;
    });
  }

  update() {
    this.blogService.update(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(['/blog-management']);
      },
      error: (er) => {
        console.log(er);
      },
    });
  }
}
