import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TemporadaService } from '../../../../service/temporada';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TemporadaTeamadminDetail } from '../../../../component/temporada/teamadmin/detail/detail';

@Component({
  selector: 'app-temporada-teamadmin-delete-page',
  imports: [TemporadaTeamadminDetail],
  templateUrl: './delete.html',
})
export class TemporadaTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private temporadaService = inject(TemporadaService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_temporada = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_temporada.set(id ? Number(id) : NaN);
    if (isNaN(this.id_temporada())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.temporadaService.delete(this.id_temporada()).subscribe({
      next: () => {
        this.snackBar.open('Temporada eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/temporada/teamadmin']);
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
