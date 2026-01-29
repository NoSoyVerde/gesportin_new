import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../environment/environment';
import { IPage } from '../model/plist';
import { IPartido } from '../model/partido';
@Injectable({
  providedIn: 'root'
})

export class PartidoService {

    constructor(private oHttp: HttpClient) { }

 //Get Page

 getPage(page: number, rpp: number, order: string = '',direction: string = '',filter: string = ''): Observable<IPage<IPartido>> {
 if (order === '') {
        order = 'id';
      }
      if (direction === '') {
        direction = 'asc';
      }
      let strUrl = serverURL + `/partido?page=${page}&size=${rpp}&sort=${order},${direction}`;
      if (filter.length > 0) {
        strUrl += `&filter=${filter}`;
      }

      return this.oHttp.get<IPage<IPartido>>(strUrl);;
}
}