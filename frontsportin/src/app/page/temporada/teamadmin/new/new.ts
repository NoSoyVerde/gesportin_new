import { Component } from '@angular/core';
import { TemporadaTeamadminForm } from '../../../../component/temporada/teamadmin/form/form';

@Component({
  selector: 'app-temporada-teamadmin-new-page',
  imports: [TemporadaTeamadminForm],
  template: '<app-temporada-teamadmin-form [returnUrl]="returnUrl"></app-temporada-teamadmin-form>',
})
export class TemporadaTeamadminNewPage {
  returnUrl = '/temporada/teamadmin';
}
