import { Component } from '@angular/core';
import { NoticiaPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/noticia-plist-teamadmin-unrouted';

@Component({
  selector: 'app-noticia-plist-teamadmin-routed',
  imports: [NoticiaPlistTeamAdminUnrouted],
  templateUrl: './noticia-plist-teamadmin-routed.html',
  styleUrls: ['./noticia-plist-teamadmin-routed.css'],
  standalone: true,
})
export class NoticiaPlistTeamAdminRouted {
}
