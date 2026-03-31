import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PuntuacionTeamadminDetail } from '../../../../component/puntuacion/teamadmin/detail/detail';

@Component({
  selector: 'app-puntuacion-teamadmin-view-page',
  imports: [PuntuacionTeamadminDetail],
  template: '<app-puntuacion-teamadmin-detail [id]="id_puntuacion"></app-puntuacion-teamadmin-detail>',
})
export class PuntuacionTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_puntuacion = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_puntuacion.set(id ? Number(id) : NaN);
  }
}
