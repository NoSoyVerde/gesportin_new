import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ArticuloAdminPlist } from '../../../articulo/admin/plist/plist';
import { TipoarticuloService } from '../../../../service/tipoarticulo';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-articulo-teamadmin-plist',
  imports: [ArticuloAdminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ArticuloTeamadminPlist implements OnInit {
  @Input() id_tipoarticulo?: number;

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Tipos de Artículos', route: '/tipoarticulo/teamadmin' },
    { label: 'Artículos' },
  ]);

  private oTipoarticuloService = inject(TipoarticuloService);

  ngOnInit(): void {
    if (this.id_tipoarticulo && this.id_tipoarticulo > 0) {
      this.oTipoarticuloService.get(this.id_tipoarticulo).subscribe({
        next: (tipo) => {
          this.breadcrumbItems.set([
            { label: 'Mis Clubes', route: '/club/teamadmin' },
            { label: 'Tipos de Artículos', route: '/tipoarticulo/teamadmin' },
            { label: tipo.descripcion, route: `/tipoarticulo/teamadmin/view/${tipo.id}` },
            { label: 'Artículos' },
          ]);
        },
        error: () => {},
      });
    }
  }
}
