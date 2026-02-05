import { Component, inject, input, Input, signal } from '@angular/core';
import { IClub } from '../../../model/club';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClubService } from '../../../service/club';
import { DatetimePipe } from '../../../pipe/datetime-pipe';

@Component({
  selector: 'app-detail-admin-unrouted',
  imports: [DatetimePipe, RouterLink],
  templateUrl: './detail-admin-unrouted.html',
  styleUrl: './detail-admin-unrouted.css',
})
export class DetailAdminUnrouted {
  oClub = input<IClub | null>(null);
  loading = input<boolean>(true);
  error = input<string | null>(null);
}
