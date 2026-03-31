import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotaTeamadminForm } from '../../../../component/cuota/teamadmin/form/form';

@Component({
  selector: 'app-cuota-teamadmin-new-page',
  imports: [CuotaTeamadminForm],
  template: '<app-cuota-teamadmin-form [returnUrl]="returnUrl" [idEquipo]="idEquipo()"></app-cuota-teamadmin-form>',
})
export class CuotaTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/cuota/teamadmin';
  idEquipo = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_equipo');
    if (val) this.idEquipo.set(Number(val));
  }
}
