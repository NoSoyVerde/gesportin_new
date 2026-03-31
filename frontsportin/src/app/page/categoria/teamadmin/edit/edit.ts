import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaTeamadminForm } from '../../../../component/categoria/teamadmin/form/form';

@Component({
  selector: 'app-categoria-teamadmin-edit-page',
  imports: [CategoriaTeamadminForm],
  template: '<app-categoria-teamadmin-form [id]="id_categoria()" [returnUrl]="returnUrl"></app-categoria-teamadmin-form>',
})
export class CategoriaTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_categoria = signal<number>(0);
  returnUrl = '/categoria/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_categoria.set(id ? Number(id) : NaN);
  }
}
