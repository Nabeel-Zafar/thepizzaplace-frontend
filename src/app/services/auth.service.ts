import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  // baseUri:string = 'http://localhost:4000/api';
  //baseUri:string = 'https://thepizza-place.herokuapp.com/api';
  baseUri:string = 'https://thepizzaplace.adaptable.app/api'
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(`${this.baseUri}/auth`, {username: username, password: password})
      .pipe(
        map(result => {
          // console.log('result',result)
          localStorage.setItem('access_token', JSON.stringify(result));
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}