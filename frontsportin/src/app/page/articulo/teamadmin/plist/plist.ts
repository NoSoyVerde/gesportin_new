import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloTeamadminPlist } from '../../../../component/articulo/teamadmin/plist/plist';

@Component({
  selector: 'app-articulo-teamadmin-plist-page',
  imports: [ArticuloTeamadminPlist],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ArticuloTeamadminPlistPage {
  id_tipoarticulo = signal<number | undefined>(undefined);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_tipoarticulo');
    if (idParam) {
      this.id_tipoarticulo.set(Number(idParam));
    }
  }
}
