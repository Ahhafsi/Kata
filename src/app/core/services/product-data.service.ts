import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawProduct } from '@core/model';
import { Observable } from 'rxjs';

@Injectable()
export class ProductDataService {
  url = '/assets/mocked-data/products.json';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<RawProduct[]> {
    return this.http.get<RawProduct[]>(this.url);
  }
}
