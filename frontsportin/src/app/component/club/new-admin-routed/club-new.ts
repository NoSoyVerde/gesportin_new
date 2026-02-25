import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubService } from '../../../service/club';
import { ClubFormUnrouted } from '../form-unrouted/club-form';

@Component({
  selector: 'app-club-new-admin-routed',
  imports: [CommonModule, ClubFormUnrouted],
  templateUrl: './club-new.html',
  styleUrl: './club-new.css',
})
export class ClubNewAdminRouted {
  private router = inject(Router);
  private clubService = inject(ClubService);
  private snackBar = inject(MatSnackBar);

  submitting = signal(false);
  error = signal<string | null>(null);

  onFormSubmit(clubData: any): void {
    this.submitting.set(true);
    this.error.set(null);

    this.clubService.create(clubData).subscribe({
      next: (id: number) => {
        this.snackBar.open('Club creado exitosamente', 'Cerrar', { duration: 4000 });
        this.submitting.set(false);
        this.router.navigate(['/club']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error creando el club');
        this.snackBar.open('Error creando el club', 'Cerrar', { duration: 4000 });
        console.error(err);
        this.submitting.set(false);
      },
    });
  }

  onFormCancel(): void {
    this.router.navigate(['/club']);
  }
}
