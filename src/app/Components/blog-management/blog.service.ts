import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<Blog[]>('http://localhost:5000/api/blogs');
  }

  create(blogData: FormData): Observable<any> {
    return this.httpClient.post<any>('http://localhost:5000/api/blogs', blogData);
  }

  getBlogsById(id:any):Observable<any>{
    return this.httpClient.get(`http://localhost:5000/api/blogs/${id}`)
  }


  // edit(id: number) {
  //   return this.httpClient.get<Blog>(`http://localhost:5000/api/blogs/${id}`);
  // }

  // update(data: Blog) {
  //   return this.httpClient.put<Blog>(
  //     `http://localhost:5000/api/blogs/${data.id}`,
  //     data
  //   );
  // }
  // delete(id: number) {
  //   return this.httpClient.delete<Blog>(`http://localhost:5000/api/blogs/${id}`);
  // }
}
