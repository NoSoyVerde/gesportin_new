import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoTeamadminForm } from '../../../../component/equipo/teamadmin/form/form';

@Component({
  selector: 'app-equipo-teamadmin-edit-page',
  imports: [EquipoTeamadminForm],
  template: '<app-equipo-teamadmin-form [id]="id_equipo()" [returnUrl]="returnUrl"></app-equipo-teamadmin-form>',
})
export class EquipoTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_equipo = signal<number>(0);
  returnUrl = '/equipo/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(id ? Number(id) : NaN);
  }
}
