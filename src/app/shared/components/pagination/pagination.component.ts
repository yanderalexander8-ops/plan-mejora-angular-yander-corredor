import { Component, EventEmitter, Input, Output } from '@angular/core';

// Paginación: recibe total, limit y skip; avisa con (pageChange) la página elegida (empieza en 1)
@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() total = 0;
  @Input() limit = 10;
  @Input() skip = 0;
  @Output() pageChange = new EventEmitter<number>();

  get currentPage(): number {
    return Math.floor(this.skip / this.limit) + 1;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }

  get from(): number {
    return this.total === 0 ? 0 : this.skip + 1;
  }

  get to(): number {
    return Math.min(this.skip + this.limit, this.total);
  }

  // Ejemplo: [1, 2, 3, '...', 20]
  get pages(): (number | '...')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const result: (number | '...')[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) {
      result.push('...');
    }
    for (let p = start; p <= end; p++) {
      result.push(p);
    }
    if (end < total - 1) {
      result.push('...');
    }
    result.push(total);
    return result;
  }

  go(page: number | '...'): void {
    if (page === '...' || page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.pageChange.emit(page);
  }
}
