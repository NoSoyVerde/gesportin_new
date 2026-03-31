import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoTeamadminForm } from '../../../../component/pago/teamadmin/form/form';

@Component({
  selector: 'app-pago-teamadmin-edit-page',
  imports: [PagoTeamadminForm],
  template: '<app-pago-teamadmin-form [id]="id_pago()" [returnUrl]="returnUrl"></app-pago-teamadmin-form>',
})
export class PagoTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_pago = signal<number>(0);
  returnUrl = '/pago/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_pago.set(id ? Number(id) : NaN);
  }
}
