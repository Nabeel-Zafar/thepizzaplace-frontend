import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubItemService {
  // baseUri:string = 'http://localhost:4000/api';
  baseUri:string = 'https://thepizza-place.netlify.app/api'
  // baseUri:string = 'https://thepizza-place.herokuapp.com/api';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  createSubItem(data: any): Observable<any> {
    console.log('data',data)
    let url = `${this.baseUri}/createSubItem`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all employees
  getSubItem() {
    return this.http.get(`${this.baseUri}/getAllsubItem`);
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
  updateSubItem(id, data): Observable<any> {
    let url = `${this.baseUri}/updatesubItem/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  // deleteSubItem(id): Observable<any> {
  //   let url = `${this.baseUri}/deletesubItem/${id}`;
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
