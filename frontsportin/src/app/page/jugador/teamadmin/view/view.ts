import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorTeamadminDetail } from '../../../../component/jugador/teamadmin/detail/detail';

@Component({
  selector: 'app-jugador-teamadmin-view-page',
  imports: [JugadorTeamadminDetail],
  template: '<app-jugador-teamadmin-detail [id]="id_jugador"></app-jugador-teamadmin-detail>',
})
export class JugadorTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_jugador = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_jugador.set(id ? Number(id) : NaN);
  }
}
