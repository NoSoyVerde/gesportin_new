import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubService } from '../../../service/club';
import { IClub } from '../../../model/club';
import { ClubFormUnrouted } from '../../club/form-unrouted/club-form';

@Component({
  selector: 'app-club-edit-routed',
  imports: [CommonModule, ClubFormUnrouted],
  templateUrl: './club-edit.html',
  styleUrl: './club-edit.css',
})
export class ClubEditAdminRouted implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clubService = inject(ClubService);
  private snackBar = inject(MatSnackBar);

  id_club = signal<number>(0);
  loading = signal(true);
  error = signal<string | null>(null);
  submitting = signal(false);
  club = signal<IClub | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || idParam === '0') {
      this.error.set('ID de club no válido');
      this.loading.set(false);
      return;
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }

    this.id_club.set(id);
    this.loadClub();
  }

  private loadClub(): void {
    this.clubService.get(this.id_club()).subscribe({
      next: (c: IClub) => {
        this.club.set(c);
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error cargando el club');
        this.snackBar.open('Error cargando el club', 'Cerrar', { duration: 4000 });
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  onFormSubmit(clubData: any): void {
    this.submitting.set(true);
    this.error.set(null);

    this.clubService.update(clubData).subscribe({
      next: (id: number) => {
        this.snackBar.open('Club actualizado exitosamente', 'Cerrar', { duration: 4000 });
        this.submitting.set(false);
        this.router.navigate(['/club']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error actualizando el club');
        this.snackBar.open('Error actualizando el club', 'Cerrar', { duration: 4000 });
        console.error(err);
        this.submitting.set(false);
      },
    });
  }

  onFormCancel(): void {
    this.router.navigate(['/club']);
  }
}