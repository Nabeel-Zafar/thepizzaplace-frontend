import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // baseUri:string = 'http://localhost:4000/api';

  // baseUri:string = 'https://thepizza-place.herokuapp.com/api';

  baseUri:string = 'https://thepizzaplace.adaptable.app/api'

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createOrder(data: any): Observable<any> {
    console.log('data',data)
    let url = `${this.baseUri}/createOrder`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getMenu() {
    return this.http.get(`${this.baseUri}/getMenu`);
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
