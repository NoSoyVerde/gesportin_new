import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JugadorService } from '../../../service/jugador-service';
import { IJugador } from '../../../model/jugador';
import { JugadorFormAdminUnrouted } from '../form-unrouted/jugador-form';

@Component({
  selector: 'app-jugador-edit-routed',
  standalone: true,
  imports: [CommonModule, JugadorFormAdminUnrouted],
  templateUrl: './jugador-edit.html',
  styleUrl: './jugador-edit.css',
})
export class JugadorEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private oJugadorService = inject(JugadorService);
  private snackBar = inject(MatSnackBar);

  id_jugador = signal<number>(0);
  loading = signal(true);
  error = signal<string | null>(null);
  jugadorActual = signal<IJugador | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || idParam === '0') {
      this.error.set('ID de jugador no válido');
      this.loading.set(false);
      return;
    }

    this.id_jugador.set(Number(idParam));

    if (isNaN(this.id_jugador())) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }

    this.loadJugador();
  }

  private loadJugador(): void {
    this.oJugadorService.getById(this.id_jugador()).subscribe({
      next: (jugador: IJugador) => {
        this.jugadorActual.set(jugador);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando el jugador');
        this.snackBar.open('Error cargando el jugador', 'Cerrar', { duration: 4000 });
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  onFormSuccess(): void {
    this.router.navigate(['/jugador']);
  }

  doCancel(): void {
    this.router.navigate(['/jugador']);
  }
}


