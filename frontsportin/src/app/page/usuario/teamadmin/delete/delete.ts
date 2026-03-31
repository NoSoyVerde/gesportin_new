import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../../../../service/usuarioService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioTeamadminDetail } from '../../../../component/usuario/teamadmin/detail/detail';

@Component({
  selector: 'app-usuario-teamadmin-delete-page',
  imports: [UsuarioTeamadminDetail],
  templateUrl: './delete.html',
})
export class UsuarioTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);
  error = signal<string | null>(null);
  id_usuario = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_usuario.set(id ? Number(id) : NaN);
    if (isNaN(this.id_usuario())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.usuarioService.delete(this.id_usuario()).subscribe({
      next: () => {
        this.snackBar.open('Usuario eliminado/a', 'Cerrar', { duration: 4000 });
        this.router.navigate(['/usuario/teamadmin']);
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
