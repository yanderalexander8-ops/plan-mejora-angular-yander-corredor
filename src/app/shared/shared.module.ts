import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastComponent } from './components/toast/toast.component';

// SharedModule: componentes reutilizables (barra de navegación, 404, spinner, toast, paginación)
// y reexporta CommonModule, ReactiveFormsModule y RouterModule para que los demás módulos
// solo tengan que importar SharedModule.
@NgModule({
  declarations: [NavbarComponent, NotFoundComponent, SpinnerComponent, ToastComponent, PaginationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    NotFoundComponent,
    SpinnerComponent,
    ToastComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
