import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PartidoService } from '../../../../service/partido';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartidoTeamadminDetail } from '../../../../component/partido/teamadmin/detail/detail';

@Component({
  selector: 'app-partido-teamadmin-delete-page',
  imports: [PartidoTeamadminDetail],
  templateUrl: './delete.html',
})
export class PartidoTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private partidoService = inject(PartidoService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_partido = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_partido.set(id ? Number(id) : NaN);
    if (isNaN(this.id_partido())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.partidoService.delete(this.id_partido()).subscribe({
      next: () => {
        this.snackBar.open('Partido eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/partido/teamadmin']);
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
