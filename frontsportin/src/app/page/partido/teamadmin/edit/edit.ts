import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoTeamadminForm } from '../../../../component/partido/teamadmin/form/form';

@Component({
  selector: 'app-partido-teamadmin-edit-page',
  imports: [PartidoTeamadminForm],
  template: '<app-partido-teamadmin-form [id]="id_partido()" [returnUrl]="returnUrl"></app-partido-teamadmin-form>',
})
export class PartidoTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_partido = signal<number>(0);
  returnUrl = '/partido/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_partido.set(id ? Number(id) : NaN);
  }
}
