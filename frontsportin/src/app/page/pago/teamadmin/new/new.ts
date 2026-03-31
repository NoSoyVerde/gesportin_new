import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoTeamadminForm } from '../../../../component/pago/teamadmin/form/form';

@Component({
  selector: 'app-pago-teamadmin-new-page',
  imports: [PagoTeamadminForm],
  template: '<app-pago-teamadmin-form [returnUrl]="returnUrl" [idCuota]="idCuota()"></app-pago-teamadmin-form>',
})
export class PagoTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/pago/teamadmin';
  idCuota = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_cuota');
    if (val) this.idCuota.set(Number(val));
  }
}
