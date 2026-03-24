import { Component } from '@angular/core';
import { NoticiaPlistAdminUnrouted } from '../plist-admin-unrouted/noticia-plist-admin-unrouted';

@Component({
  selector: 'app-noticia-plist-teamadmin-unrouted',
  imports: [NoticiaPlistAdminUnrouted],
  templateUrl: './noticia-plist-teamadmin-unrouted.html',
  styleUrls: ['./noticia-plist-teamadmin-unrouted.css'],
  standalone: true,
})
export class NoticiaPlistTeamAdminUnrouted {
  // Usa la lógica de admin pero expuesto para ruta de teamadmin
}
