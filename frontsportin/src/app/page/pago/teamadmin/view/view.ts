import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoTeamadminDetail } from '../../../../component/pago/teamadmin/detail/detail';

@Component({
  selector: 'app-pago-teamadmin-view-page',
  imports: [PagoTeamadminDetail],
  template: '<app-pago-teamadmin-detail [id]="id_pago"></app-pago-teamadmin-detail>',
})
export class PagoTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_pago = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_pago.set(id ? Number(id) : NaN);
  }
}
