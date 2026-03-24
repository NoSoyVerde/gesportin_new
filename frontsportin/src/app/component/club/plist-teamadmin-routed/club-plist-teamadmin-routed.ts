import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/club-plist-teamadmin-unrouted';

@Component({
  selector: 'app-club-plist-teamadmin-routed',
  imports: [ClubPlistTeamAdminUnrouted],
  templateUrl: './club-plist-teamadmin-routed.html',
  styleUrl: './club-plist-teamadmin-routed.css',
})
export class ClubPlistTeamAdminRouted {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
