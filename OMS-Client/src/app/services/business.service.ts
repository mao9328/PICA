import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Product } from '../model/Product';
import { ConfigList } from '../model/ConfigList';
import { GenericResponse } from '../model/GenericResponse';
import { Item } from '../model/Item';
import { BrokerService } from './broker.service';
import { environment } from 'src/environments/environment';
import { Security } from '../model/Security';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient, private broker: BrokerService) { }

  shippingKartSubject = new Subject();

  login() {

  }

  addItemToKart(item: Item) {

    let items = localStorage.getItem('Items');

    if (items == null) {

      let itemsObj = [];

      itemsObj.push(item);

      localStorage.setItem('Items', JSON.stringify(itemsObj));

    } else {

      let itemsObj = JSON.parse(items) as Item[];

      if (itemsObj.some(x => x.IdProduct == item.IdProduct)) {

        const index = itemsObj.findIndex(x => x.IdProduct == item.IdProduct);

        itemsObj[index].Quantity++;

      } else {

        itemsObj.push(item);
      }

      localStorage.setItem('Items', JSON.stringify(itemsObj));

    }

    this.notifyCartToMaster();

  }

  notifyCartToMaster() {

    this.shippingKartSubject.next(1);
  }

  getItems(): Item[] {

    const items = localStorage.getItem('Items');

    if (items == null) {

      return [];

    } else {

      return JSON.parse(items) as Item[];
    }
  }

  GetProducts(): Observable<GenericResponse<Product[]>> {

    return this.getResource('Products').pipe(map((response) => {

      let generic = new GenericResponse<Product[]>();

      generic.Result = response as Product[];

      return generic;
    }));
  }

  GetOffers(): Observable<GenericResponse<Product[]>> {

    return this.getResource('Offers').pipe(map((response) => {

      let generic = new GenericResponse<Product[]>();

      generic.Result = response as Product[];

      return generic;
    }));
  }

  GetProduct(id: number): Observable<GenericResponse<Product>> {

    return this.getResource('Products').pipe(map((response) => {

      const generic = new GenericResponse<Product>();

      generic.Result = (response as Product[]).find(x => x.Id == id);
      generic.Error = false;
      generic.Message = '';

      return generic;
    }));
  }

  GetTopFiveProducts(): Observable<GenericResponse<Product[]>> {

    return this.getResource('Products').pipe(map((response) => {

      let generic = new GenericResponse<Product[]>();

      generic.Result = response as Product[];

      return generic;
    }));
  }

  GetProductsByNameOrDesc(criteria: string): Observable<GenericResponse<Product[]>> {

    return this.getResource('Products').pipe(

      map((response) => {

        let generic = new GenericResponse<Product[]>();

        generic.Result = (response as Product[]).filter(x => x.Description.toUpperCase().indexOf(criteria.toUpperCase()) > -1 || x.Name.toUpperCase().indexOf(criteria.toUpperCase()) > -1);

        return generic;
      }));
  }

  GetConfigList(list: string): Observable<GenericResponse<ConfigList>> {

    return this.getResource('ConfigLists').pipe(map((response) => {

      let generic = new GenericResponse<ConfigList>();

      generic.Result = (response as any[]).find(x => x.Id == list) as ConfigList;

      return generic;
    }));
  }

  GetConfigListByParent(list: string, parent: string): Observable<GenericResponse<ConfigList>> {

    return this.getResource('ConfigLists').pipe(map((response) => {

      let configList = (response as any[]).find(x => x.Id == list) as ConfigList;

      configList.List = configList.List.filter(x => x.Parent == parent);

      let generic = new GenericResponse<ConfigList>();

      generic.Result = configList;

      return generic;
    }));
  }

  Authenticate(credentials: any): Observable<GenericResponse<Security<string>>> {

    return this.broker.Post<Security<string>>(environment.baseURL + environment.AuthenticationURL, credentials);
  }

  SetLocalStorage(key: string, value: any) {

    localStorage.setItem(key, JSON.stringify(value));
  }

  GetLocalStorage(key: string): any {

    return JSON.parse(localStorage.getItem(key));
  }

  private getResource(member: string): Observable<any> {

    return this.http.get('assets/resources.json')
      .pipe(
        map((response) => {

          return response[member];
        }));
  }

  public Autorize(idRol: number): Observable<boolean> {

    if (idRol == 0) {

      return of(true);

    } else {

      let token = this.GetLocalStorage(environment.TokenKey)

      if (token != null) {

        let request = {
          Token: token,
          IdRol: idRol
        };

        return this.broker.Post<Security<boolean>>(environment.baseURL + environment.AutorizationURL, request).pipe(
          map((mainResponse) => {

            if (!mainResponse.Error) {

              return mainResponse.Result.result;
            } else {

              return false;
            }
          }));

      } else {

        return of(false);
      }
    }
  }
}
