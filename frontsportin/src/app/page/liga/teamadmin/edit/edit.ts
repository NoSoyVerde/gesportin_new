import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LigaTeamadminForm } from '../../../../component/liga/teamadmin/form/form';

@Component({
  selector: 'app-liga-teamadmin-edit-page',
  imports: [LigaTeamadminForm],
  template: '<app-liga-teamadmin-form [id]="id_liga()" [returnUrl]="returnUrl"></app-liga-teamadmin-form>',
})
export class LigaTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_liga = signal<number>(0);
  returnUrl = '/liga/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_liga.set(id ? Number(id) : NaN);
  }
}
