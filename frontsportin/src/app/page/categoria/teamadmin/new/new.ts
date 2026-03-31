import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaTeamadminForm } from '../../../../component/categoria/teamadmin/form/form';

@Component({
  selector: 'app-categoria-teamadmin-new-page',
  imports: [CategoriaTeamadminForm],
  template: '<app-categoria-teamadmin-form [returnUrl]="returnUrl" [idTemporada]="idTemporada()"></app-categoria-teamadmin-form>',
})
export class CategoriaTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/categoria/teamadmin';
  idTemporada = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_temporada');
    if (val) this.idTemporada.set(Number(val));
  }
}
