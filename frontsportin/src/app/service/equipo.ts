import { Injectable } from '@angular/core';
import { IEquipo } from '../model/equipo';
import { Observable } from 'rxjs';
import { IPage } from '../model/plist';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  constructor(private oHttp: HttpClient) { }

  getPage(page: number, rpp: number, order: string = 'id', direction: string = 'asc'): Observable<IPage<IEquipo>> {
    return this.oHttp.get<IPage<IEquipo>>(serverURL + `/equipo?page=${page}&size=${rpp}&sort=${order},${direction}`);
  }
}
