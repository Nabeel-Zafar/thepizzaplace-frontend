import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MainItemService {

  baseUri:string = 'http://localhost:4000/api';
  // baseUri:string = 'https://thepizza-place.herokuapp.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createMainItem(data: any): Observable<any> {
    console.log('data',data)
    let url = `${this.baseUri}/createMainItem`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getMainItem() {
    return this.http.get(`${this.baseUri}/getAllmainItem`);
  }

  // Get employee
  // getEmployee(id): Observable<any> {
  //   let url = `${this.baseUri}/read/${id}`;
  //   return this.http.get(url, {headers: this.headers}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Update employee
  updateMainItem(id, data): Observable<any> {
    let url = `${this.baseUri}/updatemainItem/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  // deleteMainItem(id): Observable<any> {
  //   let url = `${this.baseUri}/deletemainItem/${id}`;
  //   return this.http.delete(url, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Error handling 
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
