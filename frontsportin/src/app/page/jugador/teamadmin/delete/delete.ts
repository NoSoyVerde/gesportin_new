import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JugadorService } from '../../../../service/jugador-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadorTeamadminDetail } from '../../../../component/jugador/teamadmin/detail/detail';

@Component({
  selector: 'app-jugador-teamadmin-delete-page',
  imports: [JugadorTeamadminDetail],
  templateUrl: './delete.html',
})
export class JugadorTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jugadorService = inject(JugadorService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_jugador = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_jugador.set(id ? Number(id) : NaN);
    if (isNaN(this.id_jugador())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.jugadorService.delete(this.id_jugador()).subscribe({
      next: () => {
        this.snackBar.open('Jugador eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/jugador/teamadmin']);
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
