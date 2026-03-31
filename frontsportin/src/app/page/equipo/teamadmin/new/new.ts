import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoTeamadminForm } from '../../../../component/equipo/teamadmin/form/form';

@Component({
  selector: 'app-equipo-teamadmin-new-page',
  imports: [EquipoTeamadminForm],
  template: '<app-equipo-teamadmin-form [returnUrl]="returnUrl" [idCategoria]="idCategoria()"></app-equipo-teamadmin-form>',
})
export class EquipoTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/equipo/teamadmin';
  idCategoria = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_categoria');
    if (val) this.idCategoria.set(Number(val));
  }
}
