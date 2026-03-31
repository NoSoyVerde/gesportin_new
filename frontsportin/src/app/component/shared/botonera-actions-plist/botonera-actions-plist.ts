import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../../service/session';
import { SecurityService } from '../../../service/security.service';

@Component({
  selector: 'app-botonera-actions-plist',
  imports: [RouterLink, CommonModule],
  templateUrl: './botonera-actions-plist.html',
  styleUrl: './botonera-actions-plist.css',
})
export class BotoneraActionsPlist {

  @Input() id: number = 0;
  @Input() strEntity: string = '';
  @Input() strRole: string = '';

  private session: SessionService = inject(SessionService);
  private security = inject(SecurityService);

  // Entities that club-admins may not edit or delete at all
  private clubForbidden = new Set([
    'club',
    'carrito',
    'puntuacion',
  ]);

  // Entities that club-admins may edit but not delete
  private clubNoDelete = new Set([
    'factura',
  ]);

  get canEdit(): boolean {
    if (this.session.isClubAdmin() && this.clubForbidden.has(this.strEntity)) {
      return false;
    }
    return true;
  }

  get canDelete(): boolean {
    if (this.session.isClubAdmin() && (this.clubForbidden.has(this.strEntity) || this.clubNoDelete.has(this.strEntity))) {
      return false;
    }
    return true;
  }

}
