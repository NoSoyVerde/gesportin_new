import { Component, computed, inject, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { MODAL_REF } from '../../../shared/modal/modal.tokens';
import { debounceTimeSearch } from '../../../../environment/environment';
import { IPago } from '../../../../model/pago';
import { IPage } from '../../../../model/plist';
import { PagoService } from '../../../../service/pago';
import { Paginacion } from '../../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../../shared/botonera-rpp/botonera-rpp';
import { BotoneraActionsPlist } from '../../../shared/botonera-actions-plist/botonera-actions-plist';

@Component({
  standalone: true,
  selector: 'app-pago-teamadmin-plist',
  imports: [RouterLink, Paginacion, BotoneraRpp, BotoneraActionsPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PagoTeamadminPlist implements OnInit, OnDestroy {
  @Input() id_cuota?: number;
  @Input() id_jugador?: number;

  oPage = signal<IPage<IPago> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(5);
  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('asc');
  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  private pagoService = inject(PagoService);
  private modalRef = inject(MODAL_REF, { optional: true });

  ngOnInit(): void {
    this.getPage();
  }

  ngOnDestroy(): void {}

  getPage(): void {
    this.pagoService
      .getPage(
        this.numPage(),
        this.numRpp(),
        this.orderField(),
        this.orderDirection(),
        this.id_cuota ?? 0,
        this.id_jugador ?? 0,
      )
      .subscribe({
        next: (data: IPage<IPago>) => {
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

  isDialogMode(): boolean { return !!this.modalRef; }
  onSelect(pago: IPago): void { this.modalRef?.close(pago); }
}

