import { Component, computed, OnInit } from '@angular/core';
import { ILiga } from '../../../model/liga';
import { IPage } from '../../../model/plist';
import { LigaService } from '../../../service/liga';
import { HttpErrorResponse } from '@angular/common/http';
import { Paginacion } from "../../shared/paginacion/paginacion";
import { BotoneraRpp } from "../../shared/botonera-rpp/botonera-rpp";
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liga-plist',
  imports: [Paginacion, BotoneraRpp, RouterLink],
  templateUrl: './liga-plist.html',
  styleUrl: './liga-plist.css',
})
export class LigaPlistAdminRouted implements OnInit {
  oPage: IPage<ILiga> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  rellenaOk: number | null = null;
  rellenaError: string | null = null;
  totalElementsCount: number = 0;
  totalRecords = computed(() => this.oPage?.totalElements ?? 0);

  constructor(private oLigaService: LigaService, private cdr: ChangeDetectorRef) { }

  oBotonera: string[] = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oLigaService.getPage(this.numPage, this.numRpp, this.orderField, this.orderDirection).subscribe({
      next: (data: IPage<ILiga>) => {
        this.oPage = data;
        // actualizar contador actual
        this.totalElementsCount = data.totalElements ?? 0;
        this.rellenaOk = this.totalElementsCount;
        this.cdr.markForCheck();

        // si estamos en una página que supera el límite entonces nos situamos en la ultima disponible
        if (this.numPage > 0 && this.numPage >= data.totalPages) {
          this.numPage = data.totalPages - 1;
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  onOrder(order: string) {
    if (this.orderField === order) {
      this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.orderField = order;
      this.orderDirection = 'asc';
    }
    this.numPage = 0;
    this.getPage();
    return false;
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false;
  }

  onRppChange(n: number) {
    this.numRpp = n;
    this.getPage();
    return false;
  }
}
