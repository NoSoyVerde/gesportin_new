import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LigaPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/liga-plist-teamadmin-unrouted';

@Component({
  selector: 'app-liga-plist-teamadmin-routed',
  imports: [LigaPlistTeamAdminUnrouted],
  templateUrl: './liga-plist-teamadmin-routed.html',
  styleUrls: ['./liga-plist-teamadmin-routed.css'],
})
export class LigaPlistTeamAdminRouted {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
