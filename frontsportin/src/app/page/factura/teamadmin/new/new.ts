import { Component } from '@angular/core';
import { FacturaTeamadminForm } from '../../../../component/factura/teamadmin/form/form';

@Component({
  selector: 'app-factura-teamadmin-new-page',
  imports: [FacturaTeamadminForm],
  template: '<app-factura-teamadmin-form [returnUrl]="returnUrl"></app-factura-teamadmin-form>',
})
export class FacturaTeamadminNewPage {
  returnUrl = '/factura/teamadmin';
}
