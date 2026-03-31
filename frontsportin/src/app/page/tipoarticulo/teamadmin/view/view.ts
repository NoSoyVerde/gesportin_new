import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoarticuloTeamadminDetail } from '../../../../component/tipoarticulo/teamadmin/detail/detail';

@Component({
  selector: 'app-tipoarticulo-teamadmin-view-page',
  imports: [TipoarticuloTeamadminDetail],
  template: '<app-tipoarticulo-teamadmin-detail [id]="id_tipoarticulo"></app-tipoarticulo-teamadmin-detail>',
})
export class TipoarticuloTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_tipoarticulo = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_tipoarticulo.set(id ? Number(id) : NaN);
  }
}
