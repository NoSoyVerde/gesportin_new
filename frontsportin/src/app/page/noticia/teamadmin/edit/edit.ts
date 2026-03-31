import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaTeamadminForm } from '../../../../component/noticia/teamadmin/form/form';

@Component({
  selector: 'app-noticia-teamadmin-edit-page',
  imports: [NoticiaTeamadminForm],
  template: '<app-noticia-teamadmin-form [id]="id_noticia()" [returnUrl]="returnUrl"></app-noticia-teamadmin-form>',
})
export class NoticiaTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_noticia = signal<number>(0);
  returnUrl = '/noticia/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_noticia.set(id ? Number(id) : NaN);
  }
}
