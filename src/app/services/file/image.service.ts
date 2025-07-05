import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl: string = environment.API_URL;
  http: HttpClient;
  private headersApi: HttpHeaders;
  constructor(http: HttpClient) {
    this.http = http;
    this.headersApi = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  postImage(file: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/storage/upload`, file, {
      headers: this.headersApi,
    });
  }
}
