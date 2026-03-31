import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaTeamadminDetail } from '../../../../component/factura/teamadmin/detail/detail';

@Component({
  selector: 'app-factura-teamadmin-view-page',
  imports: [FacturaTeamadminDetail],
  template: '<app-factura-teamadmin-detail [id]="id_factura"></app-factura-teamadmin-detail>',
})
export class FacturaTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_factura = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_factura.set(id ? Number(id) : NaN);
  }
}
