import { Component, computed, inject, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { MODAL_REF } from '../../../shared/modal/modal.tokens';
import { debounceTimeSearch } from '../../../../environment/environment';
import { IJugador } from '../../../../model/jugador';
import { IPage } from '../../../../model/plist';
import { JugadorService } from '../../../../service/jugador-service';
import { Paginacion } from '../../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../../shared/botonera-rpp/botonera-rpp';
import { BotoneraActionsPlist } from '../../../shared/botonera-actions-plist/botonera-actions-plist';

@Component({
  standalone: true,
  selector: 'app-jugador-teamadmin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, BotoneraActionsPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class JugadorTeamadminPlist implements OnInit, OnDestroy {
  @Input() id_equipo?: number;
  @Input() id_usuario?: number;

  oPage = signal<IPage<IJugador> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(5);
  nombre = signal<string>('');
  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('asc');
  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  private jugadorService = inject(JugadorService);
  private modalRef = inject(MODAL_REF, { optional: true });

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(debounceTimeSearch), distinctUntilChanged())
      .subscribe((term) => {
        this.nombre.set(term);
        this.numPage.set(0);
        this.getPage();
      });
    this.getPage();
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  getPage(): void {
    this.jugadorService
      .getPage(
        this.numPage(),
        this.numRpp(),
        this.orderField(),
        this.orderDirection(),
        this.nombre(),
        this.id_usuario ?? 0,
        this.id_equipo ?? 0,
      )
      .subscribe({
        next: (data: IPage<IJugador>) => {
          this.oPage.set(data);
          if (this.numPage() > 0 && this.numPage() >= data.totalPages) {
            this.numPage.set(data.totalPages - 1);
            this.getPage();
          }
        },
        error: (err: HttpErrorResponse) => console.error(err),
      });
  }

  onRppChange(n: number): void { this.numRpp.set(n); this.numPage.set(0); this.getPage(); }
  goToPage(n: number): void { this.numPage.set(n); this.getPage(); }
  onSearch(value: string): void { this.searchSubject.next(value); }

  isDialogMode(): boolean { return !!this.modalRef; }
  onSelect(jugador: IJugador): void { this.modalRef?.close(jugador); }
}

