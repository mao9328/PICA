import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { GenericResponse } from '../model/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor(private http: HttpClient) { }

  Get<T>(url: string): Observable<GenericResponse<T>> {

    return this.http.get(url, { observe: 'response' }).pipe(mergeMap((response) => {

      // tslint:disable-next-line:no-string-literal
      const status = response.headers['status'];

      if (status == 200) {

        let genericResponse = new GenericResponse<T>();

        genericResponse.Error = false;
        genericResponse.Message = null;
        genericResponse.ErrorCode = null;
        genericResponse.Result = response.body as T;

        return of(genericResponse);

      } else if (status == 500) {

        let genericResponse = new GenericResponse<T>();

        genericResponse.Error = true;
        genericResponse.Message = response.body['Description'];
        genericResponse.ErrorCode = response.body['Code'];
        genericResponse.Result = null;

        return throwError(genericResponse);
      } else {

        let genericResponse = new GenericResponse<T>();

        genericResponse.Error = true;
        genericResponse.Message = '';
        genericResponse.ErrorCode = '';
        genericResponse.Result = null;

        return throwError(genericResponse);
      }
    }))
  }

  Post<T>(url: string, data: any): Observable<GenericResponse<T>> {

    return this.http.post(url, data, { observe: 'response' }).pipe(mergeMap((response) => {
      
      const status = response.status;

      if (status == 200) {

        let genericResponse = new GenericResponse<T>();

        genericResponse.Error = false;
        genericResponse.Message = null;
        genericResponse.ErrorCode = null;
        genericResponse.Result = response.body as T;

        return of(genericResponse);

      } else if (status == 500) {

        let genericResponse = new GenericResponse<T>();

        genericResponse.Error = true;
        genericResponse.Message = response.body['Description'];
        genericResponse.ErrorCode = response.body['Code'];
        genericResponse.Result = null;

        return throwError(genericResponse);
      } else {

        let genericResponse = new GenericResponse<T>();

        genericResponse.Error = true;
        genericResponse.Message = '';
        genericResponse.ErrorCode = '';
        genericResponse.Result = null;

        return throwError(genericResponse);
      }
    }));
  }
}
