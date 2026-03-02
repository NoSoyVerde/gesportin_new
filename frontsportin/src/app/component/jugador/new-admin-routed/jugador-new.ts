import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JugadorFormAdminUnrouted } from '../form-unrouted/jugador-form';

@Component({
  selector: 'app-jugador-new-routed',
  standalone: true,
  imports: [CommonModule, JugadorFormAdminUnrouted],
  templateUrl: './jugador-new.html',
  styleUrl: './jugador-new.css',
})
export class JugadorNewAdminRouted {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/jugador']);
  }

  onFormCancel(): void {
    this.router.navigate(['/jugador']);
  }
}
