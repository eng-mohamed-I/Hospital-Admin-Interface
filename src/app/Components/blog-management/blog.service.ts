import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Blog[]>('http://localhost:3000/blogs');
  }

  create(data: Blog) {
    return this.httpClient.post('http://localhost:3000/blogs', data);
  }

  edit(id: number) {
    return this.httpClient.get<Blog>(`http://localhost:3000/blogs/${id}`);
  }

  update(data: Blog) {
    return this.httpClient.put<Blog>(
      `http://localhost:3000/blogs/${data.id}`,
      data
    );
  }
}
