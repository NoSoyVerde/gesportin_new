import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoTeamadminForm } from '../../../../component/partido/teamadmin/form/form';

@Component({
  selector: 'app-partido-teamadmin-new-page',
  imports: [PartidoTeamadminForm],
  template: '<app-partido-teamadmin-form [returnUrl]="returnUrl" [idLiga]="idLiga()"></app-partido-teamadmin-form>',
})
export class PartidoTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/partido/teamadmin';
  idLiga = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_liga');
    if (val) this.idLiga.set(Number(val));
  }
}
