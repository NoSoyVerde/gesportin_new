import { Component, OnInit, signal } from '@angular/core'; // 1. Importamos signal
import { PartidoService } from '../../../service/partido';
import { IPartido } from '../../../model/partido';
import { IPage } from '../../../model/plist';
import { HttpErrorResponse } from '@angular/common/http';
import { Paginacion } from '../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../shared/botonera-rpp/botonera-rpp';
import { TrimPipe } from '../../../pipe/trim-pipe';

@Component({
  selector: 'app-partido-plist',
  imports: [Paginacion, BotoneraRpp, TrimPipe],
  templateUrl: './partido-plist.html',
  styleUrl: './partido-plist.css',
})
export class PartidoPlist implements OnInit {

  oPage = signal<IPage<IPartido> | null>(null);
  nPage = signal<number>(0);
  nRpp = signal<number>(10);
  strResult = signal<string>('');
  filter = signal<string>('');
  
  sortField = signal<string>('id');
  sortDirection = signal<string>('asc');

  constructor(private oPartidoService: PartidoService) { }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    let campoParaElServidor = this.sortField();
    
    if (this.sortField() === 'id_liga') {
        campoParaElServidor = 'liga.id';
    }

    this.oPartidoService.getPage(
      this.nPage(), 
      this.nRpp(), 
      campoParaElServidor, 
      this.sortDirection(), 
      this.filter()
    ).subscribe({
      next: (data: IPage<IPartido>) => {
        this.oPage.set(data);

        if (this.nPage() > 0 && this.nPage() >= data.totalPages) {
          this.nPage.set(data.totalPages - 1);
          this.getPage();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.strResult.set("Error al cargar: " + error.message);
        console.error(error);
      }
    });
  }

  onSetPage(nPage: number) {
    this.nPage.set(nPage);
    this.getPage();
  }

  onSetRpp(nRpp: number) {
    this.nRpp.set(nRpp);
    this.nPage.set(0);
    this.getPage();
  }

  onFilterChange(filter: string) {
    this.filter.set(filter);
    this.nPage.set(0);
    this.getPage();
  }

  setOrder(field: string) {
    this.sortField.set(field);
    
    this.sortDirection.update(current => current === 'asc' ? 'desc' : 'asc');
    
    this.getPage();
  }
}