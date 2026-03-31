import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LigaTeamadminForm } from '../../../../component/liga/teamadmin/form/form';

@Component({
  selector: 'app-liga-teamadmin-new-page',
  imports: [LigaTeamadminForm],
  template: '<app-liga-teamadmin-form [returnUrl]="returnUrl" [idEquipo]="idEquipo()"></app-liga-teamadmin-form>',
})
export class LigaTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/liga/teamadmin';
  idEquipo = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_equipo');
    if (val) this.idEquipo.set(Number(val));
  }
}
