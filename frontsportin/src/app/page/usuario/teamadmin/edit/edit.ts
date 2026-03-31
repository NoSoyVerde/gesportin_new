import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioTeamadminForm } from '../../../../component/usuario/teamadmin/form/form';

@Component({
  selector: 'app-usuario-teamadmin-edit-page',
  imports: [UsuarioTeamadminForm],
  template: '<app-usuario-teamadmin-form [id]="id_usuario()" [returnUrl]="returnUrl"></app-usuario-teamadmin-form>',
})
export class UsuarioTeamadminEditPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_usuario = signal<number>(0);
  returnUrl = '/usuario/teamadmin';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_usuario.set(id ? Number(id) : NaN);
  }
}
