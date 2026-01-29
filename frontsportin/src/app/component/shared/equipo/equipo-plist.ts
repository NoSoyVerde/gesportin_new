import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { rpp as RPP, rpp } from '../../../environment/environment';
import { EquipoService } from '../../../service/equipo';
import { IEquipo } from '../../../model/equipo';
import { IPage } from '../../../model/plist';

@Component({
  selector: 'app-plist-equipo',
  imports: [],
  templateUrl: './plist-equipo.html',
  styleUrl: './plist-equipo.css',
})
export class PlistEquipo {
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private equipoService: EquipoService = inject(EquipoService as any);

  aEquipos: IEquipo[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;
  totalElements: number = 0;
  sort: string = 'id,asc';

  rpp = RPP;

  loading: boolean = false;
  error: string | null = null;

  ngOnInit() {
    this.loadPage();
  }

  loadPage(page: number = this.pageNumber) {
    this.loading = true;
    this.error = null;
    this.equipoService.getPage(page, this.pageSize).subscribe({
      next: (res: IPage<IEquipo>) => {
        this.aEquipos = res.content || [];
        this.pageNumber = res.number || 0;
        this.pageSize = res.size || this.pageSize;
        this.totalPages = res.totalPages || 1;
        this.totalElements = res.totalElements || 0;
        this.loading = false;
        try { this.cd.detectChanges(); } catch (e) { }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err?.message || ('Error ' + err?.status || 'Unknown');
        console.error('Error cargando equipos', err);
      }
    });
  }

  onPageChange(newPage: number) {
    if (newPage < 0) return;
    if (this.totalPages != null && newPage >= this.totalPages) return;
    this.loadPage(newPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 0; i < this.totalPages; i++) pages.push(i);
    return pages;
  }

  onSizeChange(value: any) {
    this.pageSize = Number(value);
    this.loadPage(0);
  }

}
