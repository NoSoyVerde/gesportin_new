import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioTeamadminForm } from '../../../../component/comentario/teamadmin/form/form';

@Component({
  selector: 'app-comentario-teamadmin-edit-page',
  imports: [ComentarioTeamadminForm],
  template: '<app-comentario-teamadmin-form [id]="id_comentario()" [returnUrl]="returnUrl"></app-comentario-teamadmin-form>',
})
export class ComentarioTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_comentario = signal<number>(0);
  returnUrl = '/comentario/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_comentario.set(id ? Number(id) : NaN);
  }
}
