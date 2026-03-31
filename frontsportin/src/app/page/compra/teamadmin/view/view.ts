import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraTeamadminDetail } from '../../../../component/compra/teamadmin/detail/detail';

@Component({
  selector: 'app-compra-teamadmin-view-page',
  imports: [CompraTeamadminDetail],
  template: '<app-compra-teamadmin-detail [id]="id_compra"></app-compra-teamadmin-detail>',
})
export class CompraTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_compra = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_compra.set(id ? Number(id) : NaN);
  }
}
