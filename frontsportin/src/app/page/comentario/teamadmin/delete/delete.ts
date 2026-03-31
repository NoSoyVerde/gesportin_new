import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ComentarioService } from '../../../../service/comentario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComentarioTeamadminDetail } from '../../../../component/comentario/teamadmin/detail/detail';

@Component({
  selector: 'app-comentario-teamadmin-delete-page',
  imports: [ComentarioTeamadminDetail],
  templateUrl: './delete.html',
})
export class ComentarioTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private comentarioService = inject(ComentarioService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_comentario = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_comentario.set(id ? Number(id) : NaN);
    if (isNaN(this.id_comentario())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.comentarioService.delete(this.id_comentario()).subscribe({
      next: () => {
        this.snackBar.open('Comentario eliminado', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/comentario/teamadmin']);
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
