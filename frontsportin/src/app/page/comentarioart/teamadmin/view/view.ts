import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioartTeamadminDetail } from '../../../../component/comentarioart/teamadmin/detail/detail';

@Component({
  selector: 'app-comentarioart-teamadmin-view-page',
  imports: [ComentarioartTeamadminDetail],
  template: '<app-comentarioart-teamadmin-detail [id]="id_comentarioart"></app-comentarioart-teamadmin-detail>',
})
export class ComentarioartTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_comentarioart = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_comentarioart.set(id ? Number(id) : NaN);
  }
}
