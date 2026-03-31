import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PartidoAdminPlist } from '../../../partido/admin/plist/plist';
import { LigaService } from '../../../../service/liga';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-partido-teamadmin-plist',
  imports: [PartidoAdminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PartidoTeamadminPlist implements OnInit {
  @Input() id_liga?: number;

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías', route: '/categoria/teamadmin' },
    { label: 'Equipos', route: '/equipo/teamadmin' },
    { label: 'Ligas', route: '/liga/teamadmin' },
    { label: 'Partidos' },
  ]);

  private oLigaService = inject(LigaService);

  ngOnInit(): void {
    if (this.id_liga && this.id_liga > 0) {
      this.oLigaService.get(this.id_liga).subscribe({
        next: (liga) => {
          const eq = liga.equipo;
          const cat = eq?.categoria;
          const temp = cat?.temporada;
          const items: BreadcrumbItem[] = [
            { label: 'Mis Clubes', route: '/club/teamadmin' },
            { label: 'Temporadas', route: '/temporada/teamadmin' },
          ];
          if (temp) {
            items.push({ label: temp.descripcion, route: `/temporada/teamadmin/view/${temp.id}` });
          }
          items.push({ label: 'Categorías', route: temp ? `/categoria/teamadmin/temporada/${temp.id}` : '/categoria/teamadmin' });
          if (cat) {
            items.push({ label: cat.nombre, route: `/categoria/teamadmin/view/${cat.id}` });
          }
          items.push({ label: 'Equipos', route: cat ? `/equipo/teamadmin/categoria/${cat.id}` : '/equipo/teamadmin' });
          if (eq?.nombre) {
            items.push({ label: eq.nombre, route: `/equipo/teamadmin/view/${eq.id}` });
          }
          items.push({ label: 'Ligas', route: eq ? `/liga/teamadmin/equipo/${eq.id}` : '/liga/teamadmin' });
          items.push({ label: liga.nombre });
          items.push({ label: 'Partidos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
