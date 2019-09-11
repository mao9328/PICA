import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }

  login() {

  }

  GetProducts(): Observable<Product[]> {

    return this.getResource('Products').pipe(map((response) => {
      return response as Product[];
    }));
  }

  private getResource(member: string): Observable<any> {

    return this.http.get("assets/resources.json")
      .pipe(
        map((response) => {

          return response[member];
        }));
  }
}
