import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CompraService } from '../../../../service/compra';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompraTeamadminDetail } from '../../../../component/compra/teamadmin/detail/detail';

@Component({
  selector: 'app-compra-teamadmin-delete-page',
  imports: [CompraTeamadminDetail],
  templateUrl: './delete.html',
})
export class CompraTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private compraService = inject(CompraService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_compra = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_compra.set(id ? Number(id) : NaN);
    if (isNaN(this.id_compra())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.compraService.delete(this.id_compra()).subscribe({
      next: () => {
        this.snackBar.open('Compra eliminada', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/compra/teamadmin']);
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
