import { Injectable } from '@angular/core';

import { HttpClient }    from '@angular/common/http';
import { Site } from './models/site.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class APIServiceService {

  constructor(private http: HttpClient) { }

  getData(): Observable<Site[]> {
    return this.http.get<Site[]>('https://my-json-server.typicode.com/emeery/mat-table-filter-button/sales')
  }
}
