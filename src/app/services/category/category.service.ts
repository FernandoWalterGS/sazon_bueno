import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Category {
  createdAt: string;
  name: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl: string = environment.API_URL;
  private headersApi = new HttpHeaders();

  constructor(private http: HttpClient) {}

  setHeaders() {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  getCategories(): Observable<any> {
    this.setHeaders();
    return this.http.get<any>(`${this.apiUrl}/category`, {
      headers: this.headersApi,
    });
  }

  addCategory(category: string): Observable<any> {
    this.setHeaders();
    return this.http.post<any>(
      `${this.apiUrl}/category`,
      { name: category },
      {
        headers: this.headersApi,
      }
    );
  }

  deleteCategory(id: number): Observable<any> {
    this.setHeaders();
    return this.http.delete(`${this.apiUrl}/category/${id}`, {
      headers: this.headersApi,
    });
  }
}
