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

  formdata: Blog = {
    _id: 0,
    url: '',
    Image: {
      secure_url: '', // Set to an empty string or leave as undefined if not required
      public_id: ''   // Set to an empty string or leave as undefined if not required
    },    title: '',
    body: '',
  };
  ngOnInit(): void {
    // this.route.paramMap.subscribe((param) => {
    //   let id = Number(param.get('id'));
    //   // this.getById(id);
    // });
  }
  // getById(id: number) {
  //   this.blogService.edit(id).subscribe((data) => {
  //     this.formdata = data;
  //   });
  // }

  // update() {
  //   this.blogService.update(this.formdata).subscribe({
  //     next: (data) => {
  //       this.router.navigate(['/blog-management']);
  //     },
  //     error: (er) => {
  //       console.log(er);
  //     },
  //   });
  // }
}
