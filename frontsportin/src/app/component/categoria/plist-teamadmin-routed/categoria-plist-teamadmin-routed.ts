import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaPlistTeamAdminUnrouted } from '../plist-teamadmin-unrouted/categoria-plist-teamadmin-unrouted';

@Component({
  selector: 'app-categoria-plist-teamadmin-routed',
  imports: [CategoriaPlistTeamAdminUnrouted],
  templateUrl: './categoria-plist-teamadmin-routed.html',
  styleUrl: './categoria-plist-teamadmin-routed.css',
})
export class CategoriaPlistTeamAdminRouted {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
