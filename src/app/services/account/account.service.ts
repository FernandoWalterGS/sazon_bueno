import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Account {
  name: string;
  username: string;
  date_of_birth: string;
  password: string;
}

export interface AccountLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl: string = environment.API_URL;
  private headersApi: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getAccounts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/account`, {
      headers: this.headersApi,
    });
  }

  getAccount(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/${id}`, {
      headers: this.headersApi,
    });
  }
  updateAccountById(id: number, user: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/account/${id}`, user, {
      headers: this.headersApi,
    });
  }

  registerAccount(account: Account): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/auth/register`, account, {
      observe: 'response',
    });
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/account/${id}`, {
      headers: this.headersApi,
    });
  }

  restoreAccount(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/account/restore/${id}`, {
      headers: this.headersApi,
    });
  }
}
