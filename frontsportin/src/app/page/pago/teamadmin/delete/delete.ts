import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PagoService } from '../../../../service/pago';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagoTeamadminDetail } from '../../../../component/pago/teamadmin/detail/detail';

@Component({
  selector: 'app-pago-teamadmin-delete-page',
  imports: [PagoTeamadminDetail],
  templateUrl: './delete.html',
})
export class PagoTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pagoService = inject(PagoService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_pago = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_pago.set(id ? Number(id) : NaN);
    if (isNaN(this.id_pago())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.pagoService.delete(this.id_pago()).subscribe({
      next: () => {
        this.snackBar.open('Pago eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/pago/teamadmin']);
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
