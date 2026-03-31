import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaTeamadminDetail } from '../../../../component/categoria/teamadmin/detail/detail';

@Component({
  selector: 'app-categoria-teamadmin-view-page',
  imports: [CategoriaTeamadminDetail],
  template: '<app-categoria-teamadmin-detail [id]="id_categoria"></app-categoria-teamadmin-detail>',
})
export class CategoriaTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_categoria = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_categoria.set(id ? Number(id) : NaN);
  }
}
