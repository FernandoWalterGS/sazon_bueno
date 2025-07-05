import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Difficulty {
  createdAt: string;
  level: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class DificultyService {
  private apiUrl: string = environment.API_URL;
  private headersApi = new HttpHeaders();

  constructor(private http: HttpClient) {}

  setHeaders() {
    this.headersApi = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }
  getDificulties(): Observable<Difficulty[]> {
    this.setHeaders();
    return this.http.get<Difficulty[]>(`${this.apiUrl}/difficulty`, {
      headers: this.headersApi,
    });
  }

  addDifficulty(difficulty: string): Observable<any[]> {
    this.setHeaders();
    return this.http.post<Difficulty[]>(
      `${this.apiUrl}/difficulty`,
      { name: difficulty },
      {
        headers: this.headersApi,
      }
    );
  }
  deleteDifficulty(id: number) {
    this.setHeaders();
    return this.http.delete<any>(`${this.apiUrl}/difficulty/${id}`, {
      headers: this.headersApi,
    });
  }
}
