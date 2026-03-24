import { Component, computed, inject, Input, signal } from '@angular/core';
import { IPage } from '../../../model/plist';
import { ITemporada } from '../../../model/temporada';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { debounceTimeSearch } from '../../../environment/environment';
import { TemporadaService } from '../../../service/temporada';
import { HttpErrorResponse } from '@angular/common/http';
import { BotoneraRpp } from '../../shared/botonera-rpp/botonera-rpp';
import { Paginacion } from '../../shared/paginacion/paginacion';
import { RouterLink } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim-pipe';
import { MatDialogRef } from '@angular/material/dialog';
import { BotoneraActionsPlist } from '../../shared/botonera-actions-plist/botonera-actions-plist';

@Component({
  selector: 'app-temporada-plist-teamadmin-unrouted',
  imports: [BotoneraRpp, Paginacion, RouterLink, TrimPipe, BotoneraActionsPlist],
  templateUrl: './temporada-plist-teamadmin-unrouted.html',
  styleUrl: './temporada-plist-teamadmin-unrouted.css',
  standalone: true,
})
export class TemporadaPlistTeamAdminUnrouted {
  @Input() club = signal<number>(0);

  oPage = signal<IPage<ITemporada> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(5);

  // For fill functionality
  rellenaCantidad = signal<number>(10);
  rellenando = signal<boolean>(false);
  rellenaOk = signal<string>('');
  rellenaError = signal<string>('');

  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('asc');

  private searchSubject = new Subject<string>();
  descripcion = signal<string>('');
  private searchSubscription?: Subscription;

  oTemporadaService = inject(TemporadaService);
  private dialogRef = inject(MatDialogRef<TemporadaPlistTeamAdminUnrouted>, { optional: true });

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(debounceTimeSearch), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.descripcion.set(searchTerm);
        this.numPage.set(0);
        this.getPage();
      });
    this.getPage();
  }

  getPage(): void {
    this.oTemporadaService
      .getPage(
        this.numPage(),
        this.numRpp(),
        this.orderField(),
        this.orderDirection(),
        this.descripcion(),
        this.club(),
      )
      .subscribe({
        next: (data: IPage<ITemporada>) => {
          this.oPage.set(data);
          if (this.numPage() > 0 && this.numPage() >= data.totalPages) {
            this.numPage.set(data.totalPages - 1);
            this.getPage();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        },
      });
  }

  goToPage(page: number): void {
    this.numPage.set(page);
    this.getPage();
  }

  onRppChange(rpp: number): void {
    this.numRpp.set(rpp);
    this.numPage.set(0);
    this.getPage();
  }

  onSearchDescription(value: string): void {
    this.searchSubject.next(value);
  }

  onOrder(order: string): void {
    if (this.orderField() === order) {
      this.orderDirection.set(this.orderDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.orderField.set(order);
      this.orderDirection.set('asc');
    }
    this.numPage.set(0);
    this.getPage();
  }

  isDialogMode(): boolean {
    return !!this.dialogRef;
  }

  onSelect(temporada: ITemporada): void {
    this.dialogRef?.close(temporada);
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
