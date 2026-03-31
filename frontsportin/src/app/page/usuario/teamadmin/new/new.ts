import { Component } from '@angular/core';
import { UsuarioTeamadminForm } from '../../../../component/usuario/teamadmin/form/form';

@Component({
  selector: 'app-usuario-teamadmin-new-page',
  imports: [UsuarioTeamadminForm],
  template: '<app-usuario-teamadmin-form [returnUrl]="returnUrl"></app-usuario-teamadmin-form>',
})
export class UsuarioTeamadminNewPage {
  returnUrl = '/usuario/teamadmin';
}
