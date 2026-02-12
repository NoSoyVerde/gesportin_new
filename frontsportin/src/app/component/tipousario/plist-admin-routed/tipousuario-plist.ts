import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoUsuarioPlistAdminUnrouted } from "../plist-admin-unrouted/tipousuario-plist";

@Component({
  selector: 'app-tipousuario-plist',
  imports: [CommonModule, TipoUsuarioPlistAdminUnrouted],
  templateUrl: './tipousuario-plist.html',
  styleUrl: './tipousuario-plist.css',
})
export class TipousuarioPlistAdminRouted {
  
}
