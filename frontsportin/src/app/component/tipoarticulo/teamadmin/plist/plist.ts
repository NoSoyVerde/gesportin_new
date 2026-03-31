import { Component, Input } from '@angular/core';
import { TipoarticuloAdminPlist } from '../../../tipoarticulo/admin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-tipoarticulo-teamadmin-plist',
  imports: [TipoarticuloAdminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class TipoarticuloTeamadminPlist {
  @Input() id_club?: number;

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Tipos de Artículos' },
  ];
}
