import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuotaTeamadminForm } from '../../../../component/cuota/teamadmin/form/form';

@Component({
  selector: 'app-cuota-teamadmin-edit-page',
  imports: [CuotaTeamadminForm],
  template: '<app-cuota-teamadmin-form [id]="id_cuota()" [returnUrl]="returnUrl"></app-cuota-teamadmin-form>',
})
export class CuotaTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_cuota = signal<number>(0);
  returnUrl = '/cuota/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_cuota.set(id ? Number(id) : NaN);
  }
}
