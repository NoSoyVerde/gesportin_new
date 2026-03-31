import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticuloService } from '../../../../service/articulo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticuloTeamadminDetail } from '../../../../component/articulo/teamadmin/detail/detail';

@Component({
  selector: 'app-articulo-teamadmin-delete-page',
  imports: [ArticuloTeamadminDetail],
  templateUrl: './delete.html',
})
export class ArticuloTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private articuloService = inject(ArticuloService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_articulo = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_articulo.set(id ? Number(id) : NaN);
    if (isNaN(this.id_articulo())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.articuloService.delete(this.id_articulo()).subscribe({
      next: () => {
        this.snackBar.open('Articulo eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/articulo/teamadmin']);
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
