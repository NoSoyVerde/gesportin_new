import { Component } from '@angular/core';
import { ComentarioPlistAdminRouted } from '../plist-admin-routed/comentario-plist';

@Component({
  selector: 'app-comentario-plist-teamadmin-unrouted',
  standalone: true,
  imports: [ComentarioPlistAdminRouted],
  templateUrl: './comentario-plist-teamadmin-unrouted.html',
  styleUrls: ['./comentario-plist-teamadmin-unrouted.css'],
})
export class ComentarioPlistTeamAdminUnrouted {}
