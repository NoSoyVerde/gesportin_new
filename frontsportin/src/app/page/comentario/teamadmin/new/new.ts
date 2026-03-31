import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioTeamadminForm } from '../../../../component/comentario/teamadmin/form/form';

@Component({
  selector: 'app-comentario-teamadmin-new-page',
  imports: [ComentarioTeamadminForm],
  template: '<app-comentario-teamadmin-form [returnUrl]="returnUrl" [idNoticia]="idNoticia()"></app-comentario-teamadmin-form>',
})
export class ComentarioTeamadminNewPage implements OnInit {
  private route = inject(ActivatedRoute);
  returnUrl = '/comentario/teamadmin';
  idNoticia = signal<number>(0);

  ngOnInit(): void {
    const val = this.route.snapshot.queryParamMap.get('id_noticia');
    if (val) this.idNoticia.set(Number(val));
  }
}
