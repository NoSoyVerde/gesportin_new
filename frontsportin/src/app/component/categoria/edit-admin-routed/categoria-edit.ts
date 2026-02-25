import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from '../../../service/categoria';
import { ICategoria } from '../../../model/categoria';
import { CategoriaFormAdminUnrouted } from '../form-unrouted/categoria-form';

@Component({
  selector: 'app-categoria-edit',
  standalone: true,
  imports: [CommonModule, CategoriaFormAdminUnrouted],
  templateUrl: './categoria-edit.html',
  styleUrl: './categoria-edit.css',
})
export class CategoriaEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private oCategoriaService = inject(CategoriaService);
  private snackBar = inject(MatSnackBar);

  categoria = signal<ICategoria | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || idParam === '0') {
      this.error.set('ID de categoría no válido');
      this.loading.set(false);
      return;
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }

    this.loadCategoria(id);
  }

  private loadCategoria(id: number): void {
    this.oCategoriaService.get(id).subscribe({
      next: (categoria: ICategoria) => { this.categoria.set(categoria); this.loading.set(false); },
      error: (err: HttpErrorResponse) => { this.error.set('Error cargando la categoría'); this.snackBar.open('Error cargando la categoría', 'Cerrar', { duration: 4000 }); console.error(err); this.loading.set(false); }
    });
  }

  onFormSuccess(): void { this.router.navigate(['/categoria']); }
  onFormCancel(): void { this.router.navigate(['/categoria']); }
}
