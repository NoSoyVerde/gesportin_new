import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NoticiaService } from '../../../../service/noticia';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticiaTeamadminDetail } from '../../../../component/noticia/teamadmin/detail/detail';

@Component({
  selector: 'app-noticia-teamadmin-delete-page',
  imports: [NoticiaTeamadminDetail],
  templateUrl: './delete.html',
})
export class NoticiaTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noticiaService = inject(NoticiaService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_noticia = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_noticia.set(id ? Number(id) : NaN);
    if (isNaN(this.id_noticia())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.noticiaService.delete(this.id_noticia()).subscribe({
      next: () => {
        this.snackBar.open('Noticia eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/noticia/teamadmin']);
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
