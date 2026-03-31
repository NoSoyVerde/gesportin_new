import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoTeamadminDetail } from '../../../../component/carrito/teamadmin/detail/detail';

@Component({
  selector: 'app-carrito-teamadmin-view-page',
  imports: [CarritoTeamadminDetail],
  template: '<app-carrito-teamadmin-detail [id]="id_carrito"></app-carrito-teamadmin-detail>',
})
export class CarritoTeamadminViewPage implements OnInit {
  private route = inject(ActivatedRoute);
  id_carrito = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_carrito.set(id ? Number(id) : NaN);
  }
}
