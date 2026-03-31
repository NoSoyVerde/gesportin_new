import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LigaTeamadminDetail } from '../../../../component/liga/teamadmin/detail/detail';

@Component({
  selector: 'app-liga-teamadmin-view-page',
  imports: [LigaTeamadminDetail],
  template: '<app-liga-teamadmin-detail [id]="id_liga"></app-liga-teamadmin-detail>',
})
export class LigaTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_liga = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_liga.set(id ? Number(id) : NaN);
  }
}
