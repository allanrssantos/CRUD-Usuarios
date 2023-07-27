import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // import your User interface
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'app-id': environment.apiAuthKey
    })
  };

  constructor(private http: HttpClient) { }

  getUsers(page: number, limit: number): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());

    return this.http.get<User[]>(`${environment.apiUrl}user`, { ...this.httpOptions, params: params });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}user/${id}`, this.httpOptions);
  }

  createUser(user: {
    title: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    dateOfBirth: string;
    phone: string;
    picture: string;
    location: {
      street: string;
      city: string;
      state: string;
      country: string;
      timezone: string;
    };
  }): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}user/create`, user, this.httpOptions);
  }


  updateUser(id: string, user: Partial<Omit<User, 'email'>>): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}user/${id}`, user, this.httpOptions);
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.apiUrl}user/${id}`, this.httpOptions);
  }
}
