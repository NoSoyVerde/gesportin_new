import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CuotaService } from '../../../../service/cuota';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuotaTeamadminDetail } from '../../../../component/cuota/teamadmin/detail/detail';

@Component({
  selector: 'app-cuota-teamadmin-delete-page',
  imports: [CuotaTeamadminDetail],
  templateUrl: './delete.html',
})
export class CuotaTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cuotaService = inject(CuotaService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_cuota = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_cuota.set(id ? Number(id) : NaN);
    if (isNaN(this.id_cuota())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.cuotaService.delete(this.id_cuota()).subscribe({
      next: () => {
        this.snackBar.open('Cuota eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/cuota/teamadmin']);
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
