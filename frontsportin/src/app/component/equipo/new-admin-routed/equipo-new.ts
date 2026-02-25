import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EquipoFormAdminUnrouted } from '../form-admin-unrouted/equipo-form';

@Component({
  selector: 'app-equipo-new-routed',
  standalone: true,
  imports: [CommonModule, EquipoFormAdminUnrouted],
  templateUrl: './equipo-new.html',
  styleUrl: './equipo-new.css',
})
export class EquipoNewAdminRouted {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/equipo']);
  }

  onFormCancel(): void {
    this.router.navigate(['/equipo']);
  }
}
