import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoarticuloTeamadminForm } from '../../../../component/tipoarticulo/teamadmin/form/form';

@Component({
  selector: 'app-tipoarticulo-teamadmin-edit-page',
  imports: [TipoarticuloTeamadminForm],
  template: '<app-tipoarticulo-teamadmin-form [id]="id_tipoarticulo()" [returnUrl]="returnUrl"></app-tipoarticulo-teamadmin-form>',
})
export class TipoarticuloTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_tipoarticulo = signal<number>(0);
  returnUrl = '/tipoarticulo/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_tipoarticulo.set(id ? Number(id) : NaN);
  }
}
