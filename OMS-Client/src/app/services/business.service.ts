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
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Order } from '../model/Order';

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

      if (itemsObj.some(x => x.ProductId == item.ProductId)) {

        const index = itemsObj.findIndex(x => x.ProductId == item.ProductId);

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

  GetOrdersByProductId(id: number, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    return this.broker.Get<Order[]>(environment.OrdersByProductIdURL + id + '?ordering=asc&page=' + page + '&results=' + elements);
  }

  // tslint:disable-next-line:max-line-length
  GetOrdersByPaymentRanking(idState: number, from: string, to: string, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    // tslint:disable-next-line:max-line-length
    return this.broker.Get<Order[]>(environment.OrdersByPaymentRankingURL + idState + '?start=' + from + '&end=' + to + '&ordering=asc&page=' + page + '&results=' + elements);
  }

  GetOrdersBySellingProductRanking(from: string, to: string, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    return this.broker.Get<Order[]>(environment.OrdersBySellingRankingURL + '?startDate=' + from + '&endDate=' + to);
  }

  GetOrdersByState(idState: number, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    return this.broker.Get<Order[]>(environment.OrdersByStateURL + idState + '?ordering=asc&page=' + page + '&results=' + elements);
  }

  GetOrdersByCustomer(id: number, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    return this.broker.Get<Order[]>(environment.OrdersByCustomerIdURL + id + '?ordering=asc&page=' + page + '&results=' + elements);
  }

  GetOrdersById(id: number): Observable<GenericResponse<Order>> {

    return this.broker.Get<Order>(environment.OrdersByIdURL + id);
  }

  GetOrdersByMontlyReport(year: number, month: number, day: number, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    return this.broker.Get<Order[]>(environment.OrdersByMontlyReportURL + year + '/' + month + '/' + day);
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

  public Authenticate(credentials: any): Observable<GenericResponse<Security<string>>> {

    return this.broker.Post<Security<string>>(environment.baseURL + environment.AuthenticationURL, credentials);
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

        return this.broker.Post<Security<string>>(environment.baseURL + environment.AutorizationURL, request).pipe(
          map((mainResponse) => {

            if (!mainResponse.Error) {

              return mainResponse.Result.result == 'true';
            } else {

              return false;
            }
          }));

      } else {

        return of(false);
      }
    }
  }

  sendFile(file: any): Observable<GenericResponse<any>> {

    return this.broker.Post<any>(environment.PostFileURL, file);
  }

  CreateProduct(model: Product): Observable<GenericResponse<any>> {

    return this.broker.Post<number>(environment.CreateProductURL, model);
  }

}
