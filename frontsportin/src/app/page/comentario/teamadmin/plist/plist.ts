import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioTeamadminPlist } from '../../../../component/comentario/teamadmin/plist/plist';

@Component({
  selector: 'app-comentario-teamadmin-plist-page',
  imports: [ComentarioTeamadminPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ComentarioTeamadminPlistPage {
  id_noticia = signal<number | undefined>(undefined);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_noticia');
    if (idParam) {
      this.id_noticia.set(Number(idParam));
    }
  }
}
