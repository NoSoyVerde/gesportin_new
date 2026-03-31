import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorTeamadminForm } from '../../../../component/jugador/teamadmin/form/form';

@Component({
  selector: 'app-jugador-teamadmin-edit-page',
  imports: [JugadorTeamadminForm],
  template: '<app-jugador-teamadmin-form [id]="id_jugador()" [returnUrl]="returnUrl"></app-jugador-teamadmin-form>',
})
export class JugadorTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_jugador = signal<number>(0);
  returnUrl = '/jugador/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_jugador.set(id ? Number(id) : NaN);
  }
}
