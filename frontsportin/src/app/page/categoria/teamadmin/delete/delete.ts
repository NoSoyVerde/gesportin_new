import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriaService } from '../../../../service/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaTeamadminDetail } from '../../../../component/categoria/teamadmin/detail/detail';

@Component({
  selector: 'app-categoria-teamadmin-delete-page',
  imports: [CategoriaTeamadminDetail],
  templateUrl: './delete.html',
})
export class CategoriaTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoriaService = inject(CategoriaService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_categoria = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_categoria.set(id ? Number(id) : NaN);
    if (isNaN(this.id_categoria())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.categoriaService.delete(this.id_categoria()).subscribe({
      next: () => {
        this.snackBar.open('Categoria eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/categoria/teamadmin']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando el registro');
        this.snackBar.open('Error eliminando el registro', 'Cerrar', { duration: 4000 });
        console.error(err);
      },
    });
  }

  doCancel(): void { window.history.back(); }
}
