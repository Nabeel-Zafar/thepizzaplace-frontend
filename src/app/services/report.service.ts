import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  baseUri:string = 'http://localhost:4000/api';

  // baseUri:string = 'https://thepizza-place.herokuapp.com/api';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getOrders(date,mainItemID,subItemID) {
    let url = `${this.baseUri}/getOrders`;
    return this.http.post(url, {
      startDate : date.start?.toString(),
      endDate : date.end?.toString(),
      subItemID,
      mainItemID
    })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getOrdersByNumber(serachByOrder) {
    console.log('serachByOrder',serachByOrder)
    let url = `${this.baseUri}/serachByOrder/${serachByOrder}`;
    return this.http.post(url,serachByOrder)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  createOrder(data: any): Observable<any> {
    console.log('data',data)
    let url = `${this.baseUri}/createOrder`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
