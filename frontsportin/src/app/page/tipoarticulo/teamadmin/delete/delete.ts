import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoarticuloService } from '../../../../service/tipoarticulo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoarticuloTeamadminDetail } from '../../../../component/tipoarticulo/teamadmin/detail/detail';

@Component({
  selector: 'app-tipoarticulo-teamadmin-delete-page',
  imports: [TipoarticuloTeamadminDetail],
  templateUrl: './delete.html',
})
export class TipoarticuloTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tipoarticuloService = inject(TipoarticuloService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_tipoarticulo = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_tipoarticulo.set(id ? Number(id) : NaN);
    if (isNaN(this.id_tipoarticulo())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.tipoarticuloService.delete(this.id_tipoarticulo()).subscribe({
      next: () => {
        this.snackBar.open('Tipoarticulo eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/tipoarticulo/teamadmin']);
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
