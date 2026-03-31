import { Component } from '@angular/core';
import { NoticiaTeamadminForm } from '../../../../component/noticia/teamadmin/form/form';

@Component({
  selector: 'app-noticia-teamadmin-new-page',
  imports: [NoticiaTeamadminForm],
  template: '<app-noticia-teamadmin-form [returnUrl]="returnUrl"></app-noticia-teamadmin-form>',
})
export class NoticiaTeamadminNewPage {
  returnUrl = '/noticia/teamadmin';
}
