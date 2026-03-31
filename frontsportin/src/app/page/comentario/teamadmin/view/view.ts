import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioTeamadminDetail } from '../../../../component/comentario/teamadmin/detail/detail';

@Component({
  selector: 'app-comentario-teamadmin-view-page',
  imports: [ComentarioTeamadminDetail],
  template: '<app-comentario-teamadmin-detail [id]="id_comentario"></app-comentario-teamadmin-detail>',
})
export class ComentarioTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_comentario = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_comentario.set(id ? Number(id) : NaN);
  }
}
