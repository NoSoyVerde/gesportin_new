import { Component, signal, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../service/usuarioService';
import { IUsuario } from '../../../model/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-usuario-delete',
  imports: [CommonModule],
  templateUrl: './usuario-delete.html',
  styleUrl: './usuario-delete.css',
})
export class UsuarioDeleteAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private oUsuarioService = inject(UsuarioService);
  private snackBar = inject(MatSnackBar);

  loading = signal(true);
  error = signal<string | null>(null);
  id_usuario = signal<number>(0);
  usuario = signal<IUsuario | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_usuario.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_usuario())) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }

    this.oUsuarioService.get(this.id_usuario()).subscribe({
      next: (usuario) => {
        this.usuario.set(usuario);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando el usuario');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  doDelete() {
    this.oUsuarioService.delete(this.id_usuario()).subscribe({
      next: () => {
        this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 4000 });
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando el usuario');
        this.snackBar.open('Error eliminando el usuario', 'Cerrar', { duration: 4000 });
        console.error(err);
      },
    });
  }

  doCancel() {
    window.history.back();
  }
}
