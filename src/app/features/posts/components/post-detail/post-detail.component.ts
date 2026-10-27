import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-detail',
  standalone: false,
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.postsService
      .getPost(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (post) => (this.post = post),
        error: () => (this.errorMessage = 'No se encontró la publicación solicitada.'),
      });
  }
}
