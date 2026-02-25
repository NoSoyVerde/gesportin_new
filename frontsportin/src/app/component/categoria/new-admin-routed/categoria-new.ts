import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaFormAdminUnrouted } from '../form-unrouted/categoria-form';

@Component({
  selector: 'app-categoria-new-routed',
  standalone: true,
  imports: [CommonModule, CategoriaFormAdminUnrouted],
  templateUrl: './categoria-new.html',
  styleUrl: './categoria-new.css',
})
export class CategoriaNewAdminRouted {
  private router = inject(Router);

  onFormSuccess(): void { this.router.navigate(['/categoria']); }
  onFormCancel(): void { this.router.navigate(['/categoria']); }
}
