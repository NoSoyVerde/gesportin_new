import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotaTeamadminDetail } from '../../../../component/cuota/teamadmin/detail/detail';

@Component({
  selector: 'app-cuota-teamadmin-view-page',
  imports: [CuotaTeamadminDetail],
  template: '<app-cuota-teamadmin-detail [id]="id_cuota"></app-cuota-teamadmin-detail>',
})
export class CuotaTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_cuota = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_cuota.set(id ? Number(id) : NaN);
  }
}
