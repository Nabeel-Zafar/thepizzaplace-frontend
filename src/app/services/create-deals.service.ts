import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CreateDealsService {

  
  // baseUri:string = 'http://localhost:4000/api';
  // baseUri:string = 'https://thepizza-place.herokuapp.com/api';
  baseUri:string = 'https://thepizza-place.netlify.app/api'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createDeal(data: any): Observable<any> {
    console.log('data',data)
    let url = `${this.baseUri}/createDeals`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getDeals() {
    return this.http.get(`${this.baseUri}/getAllDeals`);
  }

  updateDeals(id, data): Observable<any> {
    let url = `${this.baseUri}/updateDeals/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
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
