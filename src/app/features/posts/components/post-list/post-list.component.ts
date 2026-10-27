import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs';
import { NotificationService } from '../../../../core/services/notification.service';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  total = 0;
  readonly limit = 10;
  skip = 0;

  loading = false;
  errorMessage = '';

  // Campo de búsqueda (reactivo) y el texto que se está aplicando
  readonly searchControl = new FormControl('', { nonNullable: true });
  activeQuery = '';

  // Eliminación con confirmación previa
  postToDelete: Post | null = null;
  deleting = false;

  constructor(private postsService: PostsService, private notifications: NotificationService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';
    this.postsService
      .getPosts(this.limit, this.skip, this.activeQuery)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.posts = res.posts;
          this.total = res.total;
        },
        error: () => {
          this.posts = [];
          this.total = 0;
          this.errorMessage = 'No se pudieron cargar las publicaciones. Inténtalo de nuevo.';
        },
      });
  }

  search(): void {
    this.activeQuery = this.searchControl.value.trim();
    this.skip = 0;
    this.load();
  }

  onPageChange(page: number): void {
    this.skip = (page - 1) * this.limit;
    this.load();
  }

  askDelete(post: Post): void {
    this.postToDelete = post;
  }

  cancelDelete(): void {
    if (!this.deleting) {
      this.postToDelete = null;
    }
  }

  confirmDelete(): void {
    if (!this.postToDelete) {
      return;
    }
    const post = this.postToDelete;
    this.deleting = true;
    this.postsService
      .deletePost(post.id)
      .pipe(
        finalize(() => {
          this.deleting = false;
          this.postToDelete = null;
        })
      )
      .subscribe({
        next: (res) => {
          // DummyJSON no guarda el cambio, así que lo quitamos de la lista solo en pantalla
          this.posts = this.posts.filter((p) => p.id !== post.id);
          this.total = Math.max(0, this.total - 1);
          this.notifications.success(`Publicación #${post.id} eliminada (simulado)`, res);
        },
        error: () => this.notifications.error('No se pudo eliminar la publicación. Inténtalo de nuevo.'),
      });
  }
}
