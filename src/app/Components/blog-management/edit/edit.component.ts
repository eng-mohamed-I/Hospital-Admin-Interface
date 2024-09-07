import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog';
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
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
    id: 0,
    url: '',
    title: '',
    body: '',
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'));
      this.getById(id);
    });
  }
  getById(id: number) {
    this.blogService.edit(id).subscribe((data) => {
      this.formdata = data;
    });
  }
}
