import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LigaService } from '../../../../service/liga';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LigaTeamadminDetail } from '../../../../component/liga/teamadmin/detail/detail';

@Component({
  selector: 'app-liga-teamadmin-delete-page',
  imports: [LigaTeamadminDetail],
  templateUrl: './delete.html',
})
export class LigaTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ligaService = inject(LigaService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_liga = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_liga.set(id ? Number(id) : NaN);
    if (isNaN(this.id_liga())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.ligaService.delete(this.id_liga()).subscribe({
      next: () => {
        this.snackBar.open('Liga eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/liga/teamadmin']);
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
