import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EquipoService } from '../../../../service/equipo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipoTeamadminDetail } from '../../../../component/equipo/teamadmin/detail/detail';

@Component({
  selector: 'app-equipo-teamadmin-delete-page',
  imports: [EquipoTeamadminDetail],
  templateUrl: './delete.html',
})
export class EquipoTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private equipoService = inject(EquipoService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_equipo = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(id ? Number(id) : NaN);
    if (isNaN(this.id_equipo())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.equipoService.delete(this.id_equipo()).subscribe({
      next: () => {
        this.snackBar.open('Equipo eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/equipo/teamadmin']);
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
