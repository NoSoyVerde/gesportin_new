import { Component, computed, inject, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MODAL_REF } from '../../../shared/modal/modal.tokens';
import { ICompra } from '../../../../model/compra';
import { IPage } from '../../../../model/plist';
import { CompraService } from '../../../../service/compra';
import { Paginacion } from '../../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../../shared/botonera-rpp/botonera-rpp';
import { BotoneraActionsPlist } from '../../../shared/botonera-actions-plist/botonera-actions-plist';

@Component({
  standalone: true,
  selector: 'app-compra-teamadmin-plist',
  imports: [RouterLink, DecimalPipe, Paginacion, BotoneraRpp, BotoneraActionsPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class CompraTeamadminPlist implements OnInit, OnDestroy {
  @Input() id_articulo?: number;

  oPage = signal<IPage<ICompra> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(5);
  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('asc');
  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  private compraService = inject(CompraService);
  private modalRef = inject(MODAL_REF, { optional: true });

  ngOnInit(): void {
    this.getPage();
  }

  ngOnDestroy(): void {}

  getPage(): void {
    this.compraService
      .getPage(
        this.numPage(),
        this.numRpp(),
        this.orderField(),
        this.orderDirection(),
        this.id_articulo ?? 0,
        0,
      )
      .subscribe({
        next: (data: IPage<ICompra>) => {
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
  onSelect(compra: ICompra): void { this.modalRef?.close(compra); }
}

