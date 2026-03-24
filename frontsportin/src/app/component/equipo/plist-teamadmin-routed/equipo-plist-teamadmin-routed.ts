import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipoPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/equipo-plist-teamadmin-unrouted';

@Component({
  selector: 'app-equipo-plist-teamadmin-routed',
  imports: [EquipoPlistTeamAdminUnrouted],
  templateUrl: './equipo-plist-teamadmin-routed.html',
  styleUrl: './equipo-plist-teamadmin-routed.css',
})
export class EquipoPlistTeamAdminRouted {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
