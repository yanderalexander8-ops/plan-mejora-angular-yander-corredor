import { Component, Input } from '@angular/core';

// Indicador de carga reutilizable
@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent {
  @Input() message = 'Cargando...';
}
