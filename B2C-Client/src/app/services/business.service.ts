import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Product } from '../model/Product';
import { ConfigList } from '../model/ConfigList';
import { GenericResponse } from '../model/GenericResponse';
import { Item } from '../model/Item';
import { Order } from '../model/Order';
import { BrokerService } from './broker.service';
import { Security } from '../model/Security';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient, private broker: BrokerService) { }

  shippingKartSubject = new Subject();

  addItemToKart(item: Item) {

    const items = localStorage.getItem('Items');

    if (items == null) {

      const itemsObj = [];

      itemsObj.push(item);

      localStorage.setItem('Items', JSON.stringify(itemsObj));

    } else {

      const itemsObj = JSON.parse(items) as Item[];

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

  GetProducts(page: number, elements: number): Observable<GenericResponse<Product[]>> {

    return this.broker.Get<Product[]>(environment.GetAllProducstURL + elements + '/' + page);
  }

  GetOrders(id: number, elements: number, page: number): Observable<GenericResponse<Order[]>> {

    return this.broker.Get<Order[]>(environment.GetOrdersByCustomer + id + '?ordering=asc&page=' + page + '&results=' + elements);
  }

  GetOrder(idOrder: number): Observable<GenericResponse<Order>> {

    return this.broker.Get<Order>(environment.GetOrderById + idOrder);
  }

  CreateOrder(model: Order): Observable<GenericResponse<number>> {

    return this.broker.Post<number>(environment.CreateOrder, model);
  }

  GetCustomerByEmail(idUser: number): Observable<GenericResponse<Customer>> {

    return this.broker.Get<Customer>(environment.GetCustomerByEmailURL + idUser);
  }

  UpdateCustomer(id: number, model: Customer): Observable<GenericResponse<boolean>> {

    return this.broker.Put<boolean>(environment.UpdateCustomerURL + id, model);
  }

  CreateCustomer(model: Customer): Observable<GenericResponse<boolean>> {

    return this.broker.Post<boolean>(environment.UpdateCustomerURL, model);
  }

  GetProduct(id: number): Observable<GenericResponse<Product>> {

    return this.broker.Get<Product>(environment.GetProducstByIdURL + id);
  }

  GetTopFiveProducts(): Observable<GenericResponse<Product[]>> {

    return this.getResource('Products').pipe(map((response) => {

      const generic = new GenericResponse<Product[]>();

      generic.Result = response as Product[];

      return generic;
    }));
  }

  GetProductsByCode(criteria: string, elements: number, page: number): Observable<GenericResponse<Product[]>> {

    return this.broker.Get<Product[]>(environment.GetProducstByCodeURL + criteria + '/' + elements + '/' + page);
  }

  GetProductsByNameOrDesc(criteria: string, elements: number, page: number): Observable<GenericResponse<Product[]>> {

    return this.broker.Get<Product[]>(environment.GetProducstByCriteriaURL + criteria + '/' + elements + '/' + page);
  }

  private getResource(member: string): Observable<any> {

    return this.http.get('assets/resources.json')
      .pipe(
        map((response) => {

          return response[member];
        }));
  }

  public Authenticate(credentials: any): Observable<GenericResponse<Security<string>>> {

    return this.broker.Post<Security<string>>(environment.AuthenticationURL, credentials);
  }

  public Autorize(idRol: number): Observable<boolean> {

    if (idRol == 0) {

      return of(true);

    } else {

      const token = this.GetLocalStorage(environment.TokenKey)

      if (token != null) {

        const request = {
          Token: token,
          IdRol: idRol
        };

        return this.broker.Post<Security<boolean>>(environment.AutorizationURL, request).pipe(
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

  SetLocalStorage(key: string, value: any) {

    localStorage.setItem(key, JSON.stringify(value));
  }

  GetLocalStorage(key: string): any {

    return JSON.parse(localStorage.getItem(key));
  }

}
