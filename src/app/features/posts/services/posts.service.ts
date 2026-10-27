import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../../../core/constants/api.constants';
import { DeletedPost, Post, PostPayload, PostsResponse } from '../models/post.model';

// Todas las peticiones HTTP del módulo de publicaciones viven aquí.
// Los componentes NO usan HttpClient directamente.
@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly url = `${API_URL}/posts`;

  constructor(private http: HttpClient) {}

  // GET /posts?limit=10&skip=0  o  GET /posts/search?q=...&limit=10&skip=0
  getPosts(limit: number, skip: number, query = ''): Observable<PostsResponse> {
    let params = new HttpParams().set('limit', limit).set('skip', skip);
    const q = query.trim();
    if (q) {
      params = params.set('q', q);
      return this.http.get<PostsResponse>(`${this.url}/search`, { params });
    }
    return this.http.get<PostsResponse>(this.url, { params });
  }

  // GET /posts/{id}
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  // GET /posts/tag-list
  getTags(): Observable<string[]> {
    return this.http
      .get<(string | { slug: string })[]>(`${this.url}/tag-list`)
      .pipe(map((tags) => tags.map((t) => (typeof t === 'string' ? t : t.slug))));
  }

  // POST /posts/add (DummyJSON simula la creación)
  createPost(payload: PostPayload): Observable<Post> {
    return this.http.post<Post>(`${this.url}/add`, payload);
  }

  // PUT /posts/{id} (DummyJSON simula la edición)
  updatePost(id: number, payload: PostPayload): Observable<Post> {
    return this.http.put<Post>(`${this.url}/${id}`, payload);
  }

  // DELETE /posts/{id} (DummyJSON simula la eliminación)
  deletePost(id: number): Observable<DeletedPost> {
    return this.http.delete<DeletedPost>(`${this.url}/${id}`);
  }
}
