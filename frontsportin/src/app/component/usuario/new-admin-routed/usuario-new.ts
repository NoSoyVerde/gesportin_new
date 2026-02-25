import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioFormAdminUnrouted } from '../form-admin-unrouted/usuario-form';

@Component({
  selector: 'app-usuario-new-routed',
  standalone: true,
  imports: [CommonModule, UsuarioFormAdminUnrouted],
  templateUrl: './usuario-new.html',
  styleUrl: './usuario-new.css',
})
export class UsuarioNewAdminRouted {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/usuario']);
  }

  onFormCancel(): void {
    this.router.navigate(['/usuario']);
  }
}
