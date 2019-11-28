import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { GenericResponse } from '../model/GenericResponse';
import { BoundDirectivePropertyAst } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  constructor(private http: HttpClient) { }

  Get<T>(url: string): Observable<GenericResponse<T>> {

    return this.http.get(url, { observe: 'response' }).pipe(
      mergeMap((response) => {

        const genericResponse = new GenericResponse<T>();

        genericResponse.Error = false;
        genericResponse.Message = null;
        genericResponse.ErrorCode = null;

        const body = response.body as any;

        if (typeof (body.Total) != 'undefined') {

          genericResponse.Result = body.Elements;
          genericResponse.Rows = body.Total;

        } else {

          genericResponse.Result = response.body as T;
        }


        return of(genericResponse);
      }),
      catchError((response: HttpErrorResponse) => {

        const genericResponse = new GenericResponse<T>();

        const body: any = response.error;

        if (body.Description !== undefined) {

          genericResponse.Message = body.Description;
        }

        if (body.message !== undefined) {

          genericResponse.Message = body.message;
        }

        genericResponse.Error = true;
        genericResponse.ErrorCode = '';
        genericResponse.Result = null;

        return throwError(genericResponse);
      }));
  }

  Post<T>(url: string, data: any): Observable<GenericResponse<T>> {

    return this.http.post(url, data).pipe(mergeMap((response) => {

      const genericResponse = new GenericResponse<T>();

      genericResponse.Error = false;
      genericResponse.Message = null;
      genericResponse.ErrorCode = null;
      genericResponse.Result = response as T;

      return of(genericResponse);

    }),
      catchError((response: HttpErrorResponse) => {

        const genericResponse = new GenericResponse<T>();

        const body: any = response.error;

        if (body.Description !== undefined) {

          genericResponse.Message = body.Description;
        }

        if (body.message !== undefined) {

          genericResponse.Message = body.message;
        }

        genericResponse.Error = true;
        genericResponse.ErrorCode = '';
        genericResponse.Result = null;

        return throwError(genericResponse);
      }));
  }

  Put<T>(url: string, data: any): Observable<GenericResponse<T>> {

    return this.http.put(url, data).pipe(mergeMap((response) => {



      const genericResponse = new GenericResponse<T>();

      genericResponse.Error = false;
      genericResponse.Message = null;
      genericResponse.ErrorCode = null;

      if (response != null) {

        genericResponse.Result = response as T;
      } else {

        genericResponse.Result = null;
      }

      return of(genericResponse);
    }),
      catchError((response: HttpErrorResponse) => {

        const genericResponse = new GenericResponse<T>();

        const body: any = response.error;

        if (body.Description !== undefined) {

          genericResponse.Message = body.Description;
        }

        if (body.message !== undefined) {

          genericResponse.Message = body.message;
        }

        genericResponse.Error = true;
        genericResponse.ErrorCode = '';
        genericResponse.Result = null;

        return throwError(genericResponse);
      }));
  }
}
