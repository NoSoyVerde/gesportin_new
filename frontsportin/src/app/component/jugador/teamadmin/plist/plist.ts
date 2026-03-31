import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { JugadorAdminPlist } from '../../../jugador/admin/plist/plist';
import { EquipoService } from '../../../../service/equipo';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-jugador-teamadmin-plist',
  imports: [JugadorAdminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class JugadorTeamadminPlist implements OnInit {
  @Input() id_equipo?: number;

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías', route: '/categoria/teamadmin' },
    { label: 'Equipos', route: '/equipo/teamadmin' },
    { label: 'Jugadores' },
  ]);

  private oEquipoService = inject(EquipoService);

  ngOnInit(): void {
    if (this.id_equipo && this.id_equipo > 0) {
      this.oEquipoService.get(this.id_equipo).subscribe({
        next: (eq) => {
          const cat = eq.categoria;
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
          if (eq.nombre) {
            items.push({ label: eq.nombre, route: `/equipo/teamadmin/view/${eq.id}` });
          }
          items.push({ label: 'Jugadores' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
