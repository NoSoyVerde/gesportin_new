import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '../../../service/session';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  private session = inject(SessionService);
  private destroyRef = inject(DestroyRef);

  menuItems = signal<any[]>([]);

  constructor() {
    this.updateMenu();

    this.session.subjectLogin
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => setTimeout(() => this.updateMenu()));

    this.session.subjectLogout
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => setTimeout(() => this.updateMenu()));
  }

  private updateMenu(): void {
    this.menuItems.set(this.buildMenuItems());
  }

  private buildMenuItems(): any[] {
    const isAdmin = this.session.isAdmin();
    const isClubAdmin = this.session.isClubAdmin();

    const items: any[] = [
      { label: 'Home', icon: 'house-fill', route: '/' },
    ];

    if (isAdmin) {
      items.push({ label: 'Clubes', icon: 'building', route: '/club' });
    } else if (isClubAdmin) {
      items.push({ label: 'Mi Club', icon: 'building', route: '/club/teamadmin' });
    }

    const temporadaRoute = isClubAdmin ? '/temporada/teamadmin' : '/temporada';
    const categoriaRoute = isClubAdmin ? '/categoria/teamadmin' : '/categoria';
    const equipoRoute = isClubAdmin ? '/equipo/teamadmin' : '/equipo';
    const ligaRoute = isClubAdmin ? '/liga/teamadmin' : '/liga';
    const noticiaRoute = isClubAdmin ? '/noticia/teamadmin' : '/noticia';
    const comentarioRoute = isClubAdmin ? '/comentario/teamadmin' : '/comentario';
    const tipoarticuloRoute = isClubAdmin ? '/tipoarticulo/teamadmin' : '/tipoarticulo';

    items.push(
      {
        label: 'Noticias',
        icon: 'newspaper',
        children: [
          { label: 'Noticias', icon: 'pencil-square', route: noticiaRoute },
          { label: 'Comentarios', icon: 'chat-left-text', route: comentarioRoute },
          { label: 'Puntuaciones', icon: 'star-fill', route: '/puntuacion' },
        ],
      },
      {
        label: 'Gestión',
        icon: 'gear',
        children: [
          { label: 'Temporadas', icon: 'calendar', route: temporadaRoute },
          { label: 'Categorías', icon: 'tags', route: categoriaRoute },
          { label: 'Equipos', icon: 'people-fill', route: equipoRoute },
          { label: 'Ligas', icon: 'trophy', route: ligaRoute },          
          { label: 'Partidos', icon: 'play-fill', route: '/partido' },
          { label: 'Jugadores', icon: 'person-fill', route: '/jugador' },
          { label: 'Cuotas', icon: 'credit-card', route: '/cuota' },
          { label: 'Pagos', icon: 'cash-coin', route: '/pago' },
        ],
      },
      {
        label: 'Tienda',
        icon: 'shop',
        children: [          
          { label: 'Tipos de Artículos', icon: 'bookmark-fill', route: tipoarticuloRoute },
          { label: 'Artículos', icon: 'bag-fill', route: '/articulo' },
          { label: 'Compras', icon: 'cart-fill', route: '/compra' },
          { label: 'Facturas', icon: 'receipt', route: '/factura' },
          { label: 'Carritos', icon: 'bag-check', route: '/carrito' },
          { label: 'Comentarios de Artículos', icon: 'chat-dots', route: '/comentarioart' },
        ],
      },
    );

    if (isAdmin) {
      items.push({
        label: 'Usuarios',
        icon: 'people',
        children: [
          { label: 'Usuarios', icon: 'people', route: '/usuario' },
          { label: 'Tipos de Usuario', icon: 'tags-fill', route: '/tipousuario' },
          { label: 'Roles de Usuario', icon: 'shield-check', route: '/rolusuario' },
        ],
      });
    }

    return items;
  }
}
