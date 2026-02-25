import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaPlistAdminUnrouted } from '../plist-admin-unrouted/categoria-plist-admin-unrouted';

@Component({
  selector: 'app-categoria-plist',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoriaPlistAdminUnrouted],
  templateUrl: './categoria-plist.html',
  styleUrl: './categoria-plist.css',
})
export class CategoriaPlistAdminRouted {
  temporada = signal<number>(0);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_temporada');
    if (id) {
      this.temporada.set(+id);
    }
  }
}