import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ComentarioAdminPlist } from '../../../comentario/admin/plist/plist';
import { NoticiaService } from '../../../../service/noticia';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../shared/breadcrumb/breadcrumb';

@Component({
  standalone: true,
  selector: 'app-comentario-teamadmin-plist',
  imports: [ComentarioAdminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class ComentarioTeamadminPlist implements OnInit {
  @Input() id_noticia?: number;

  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mis Clubes', route: '/club/teamadmin' },
    { label: 'Noticias', route: '/noticia/teamadmin' },
    { label: 'Comentarios' },
  ]);

  private oNoticiaService = inject(NoticiaService);

  ngOnInit(): void {
    if (this.id_noticia && this.id_noticia > 0) {
      this.oNoticiaService.getById(this.id_noticia).subscribe({
        next: (noticia) => {
          this.breadcrumbItems.set([
            { label: 'Mis Clubes', route: '/club/teamadmin' },
            { label: 'Noticias', route: '/noticia/teamadmin' },
            { label: noticia.titulo.length > 40 ? noticia.titulo.substring(0, 40) + '…' : noticia.titulo, route: `/noticia/teamadmin/view/${noticia.id}` },
            { label: 'Comentarios' },
          ]);
        },
        error: () => {},
      });
    }
  }
}
