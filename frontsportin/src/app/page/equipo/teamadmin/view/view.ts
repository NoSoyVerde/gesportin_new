import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoTeamadminDetail } from '../../../../component/equipo/teamadmin/detail/detail';

@Component({
  selector: 'app-equipo-teamadmin-view-page',
  imports: [EquipoTeamadminDetail],
  template: '<app-equipo-teamadmin-detail [id]="id_equipo"></app-equipo-teamadmin-detail>',
})
export class EquipoTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_equipo = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(id ? Number(id) : NaN);
  }
}
