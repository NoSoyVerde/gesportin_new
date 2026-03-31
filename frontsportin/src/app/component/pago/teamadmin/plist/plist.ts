import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PagoAdminPlist } from '../../../pago/admin/plist/plist';
import { CuotaService } from '../../../../service/cuota';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-pago-teamadmin-plist',
  imports: [PagoAdminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PagoTeamadminPlist implements OnInit {
  @Input() id_cuota?: number;
  @Input() id_jugador?: number;

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Temporadas', route: '/temporada/teamadmin' },
    { label: 'Categorías', route: '/categoria/teamadmin' },
    { label: 'Equipos', route: '/equipo/teamadmin' },
    { label: 'Cuotas', route: '/cuota/teamadmin' },
    { label: 'Pagos' },
  ]);

  private oCuotaService = inject(CuotaService);

  ngOnInit(): void {
    if (this.id_cuota && this.id_cuota > 0) {
      this.oCuotaService.get(this.id_cuota).subscribe({
        next: (cuota) => {
          const eq = cuota.equipo;
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
          items.push({ label: 'Cuotas', route: eq ? `/cuota/teamadmin/equipo/${eq.id}` : '/cuota/teamadmin' });
          items.push({ label: cuota.descripcion });
          items.push({ label: 'Pagos' });
          this.breadcrumbItems.set(items);
        },
        error: () => {},
      });
    }
  }
}
