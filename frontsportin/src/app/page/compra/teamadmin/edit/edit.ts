import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompraTeamadminForm } from '../../../../component/compra/teamadmin/form/form';

@Component({
  selector: 'app-compra-teamadmin-edit-page',
  imports: [CompraTeamadminForm],
  template: '<app-compra-teamadmin-form [id]="id_compra()" [returnUrl]="returnUrl"></app-compra-teamadmin-form>',
})
export class CompraTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_compra = signal<number>(0);
  returnUrl = '/compra/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_compra.set(id ? Number(id) : NaN);
  }
}
