import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loading = false;
  errorMessage = '';

  // Formulario reactivo: usuario y contraseña obligatorios, contraseña de mínimo 6 caracteres
  readonly form: FormGroup<{ username: FormControl<string>; password: FormControl<string> }>;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  submit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { username, password } = this.form.getRawValue();

    this.auth
      .login(username, password)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (err: HttpErrorResponse) => {
          // DummyJSON responde 400 cuando las credenciales son incorrectas
          this.errorMessage =
            err.status === 400
              ? 'Usuario o contraseña incorrectos'
              : 'No se pudo conectar con el servidor. Inténtalo de nuevo.';
        },
      });
  }
}
