import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin, of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { minSelected, positiveInteger } from '../../../../shared/validators/custom-validators';
import { PostPayload } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

type FieldName = 'title' | 'body' | 'tags' | 'userId';

// Un solo componente sirve para crear (/posts/new) y editar (/posts/:id/edit)
@Component({
  selector: 'app-post-form',
  standalone: false,
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnInit {
  postId: number | null = null;
  tags: string[] = [];

  loading = false;
  saving = false;
  errorMessage = '';

  readonly form: FormGroup<{
    title: FormControl<string>;
    body: FormControl<string>;
    tags: FormControl<string[]>;
    userId: FormControl<number | null>;
  }>;

  private readonly messages: Record<FieldName, Record<string, string>> = {
    title: {
      required: 'El título es obligatorio',
      minlength: 'El título debe tener mínimo 5 caracteres',
    },
    body: {
      required: 'El contenido es obligatorio',
      minlength: 'El contenido debe tener mínimo 20 caracteres',
    },
    tags: {
      minSelected: 'Selecciona al menos una etiqueta',
    },
    userId: {
      required: 'El ID de usuario es obligatorio',
      positiveInteger: 'El ID de usuario debe ser un número entero mayor a 0',
    },
  };

  constructor(
    fb: NonNullableFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private auth: AuthService,
    private notifications: NotificationService
  ) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(20)]],
      tags: [[] as string[], [minSelected(1)]],
      userId: [null as number | null, [Validators.required, positiveInteger]],
    });
  }

  get isEdit(): boolean {
    return this.postId !== null;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.postId = idParam ? Number(idParam) : null;

    // En creación, sugerimos el id del usuario autenticado
    if (!this.isEdit) {
      this.form.controls.userId.setValue(this.auth.getUser()?.id ?? null);
    }

    this.loading = true;
    // Pedimos las etiquetas y, si es edición, también la publicación
    forkJoin({
      tags: this.postsService.getTags(),
      post: this.isEdit ? this.postsService.getPost(this.postId as number) : of(null),
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: ({ tags, post }) => {
          this.tags = tags;
          if (post) {
            // En edición el formulario se precarga con los datos del registro
            this.form.patchValue({
              title: post.title,
              body: post.body,
              tags: post.tags,
              userId: post.userId,
            });
          }
        },
        error: () => (this.errorMessage = 'No se pudo cargar la información del formulario.'),
      });
  }

  // Devuelve el mensaje de error de un campo (solo si fue tocado)
  errorOf(field: FieldName): string | null {
    const control = this.form.controls[field];
    if (!control.invalid || !(control.touched || control.dirty)) {
      return null;
    }
    const key = Object.keys(control.errors ?? {})[0];
    return this.messages[field][key] ?? 'Valor no válido';
  }

  isInvalid(field: FieldName): boolean {
    return this.errorOf(field) !== null;
  }

  save(): void {
    if (this.form.invalid || this.saving) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: PostPayload = {
      title: raw.title.trim(),
      body: raw.body.trim(),
      tags: raw.tags,
      userId: Number(raw.userId),
    };

    this.saving = true;
    const request$ = this.isEdit
      ? this.postsService.updatePost(this.postId as number, payload)
      : this.postsService.createPost(payload);

    request$.pipe(finalize(() => (this.saving = false))).subscribe({
      next: (res) => {
        const message = this.isEdit ? 'Publicación actualizada (simulado)' : 'Publicación creada (simulado)';
        this.notifications.success(message, res);
        this.router.navigate(['/posts']);
      },
      error: () => this.notifications.error('No se pudo guardar la publicación. Inténtalo de nuevo.'),
    });
  }
}
