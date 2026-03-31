import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaTeamadminDetail } from '../../../../component/temporada/teamadmin/detail/detail';

@Component({
  selector: 'app-temporada-teamadmin-view-page',
  imports: [TemporadaTeamadminDetail],
  template: '<app-temporada-teamadmin-detail [id]="id_temporada"></app-temporada-teamadmin-detail>',
})
export class TemporadaTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_temporada = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_temporada.set(id ? Number(id) : NaN);
  }
}
