import { Component } from '@angular/core';
import { TipoarticuloTeamadminForm } from '../../../../component/tipoarticulo/teamadmin/form/form';

@Component({
  selector: 'app-tipoarticulo-teamadmin-new-page',
  imports: [TipoarticuloTeamadminForm],
  template: '<app-tipoarticulo-teamadmin-form [returnUrl]="returnUrl"></app-tipoarticulo-teamadmin-form>',
})
export class TipoarticuloTeamadminNewPage {
  returnUrl = '/tipoarticulo/teamadmin';
}
