import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraTeamadminForm } from '../../../../component/compra/teamadmin/form/form';

@Component({
  selector: 'app-compra-teamadmin-new-page',
  imports: [CompraTeamadminForm],
  template: '<app-compra-teamadmin-form [returnUrl]="returnUrl" [idArticulo]="idArticulo()"></app-compra-teamadmin-form>',
})
export class CompraTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/compra/teamadmin';
  idArticulo = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_articulo');
    if (val) this.idArticulo.set(Number(val));
  }
}
