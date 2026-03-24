import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemporadaPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/temporada-plist-teamadmin-unrouted';

@Component({
  selector: 'app-temporada-plist-teamadmin-routed',
  imports: [TemporadaPlistTeamAdminUnrouted],
  templateUrl: './temporada-plist-teamadmin-routed.html',
  styleUrl: './temporada-plist-teamadmin-routed.css',
})
export class TemporadaPlistTeamAdminRouted {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
